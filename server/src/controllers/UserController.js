import UserModel from "../models/UserModel.js";
import bcrypt from "bcrypt";

// ✅ Récupérer un utilisateur par ID
export const getUserById = async (req, res) => {
  try {
    const user = await UserModel.findByPk(req.params.id, {
      attributes: ["id", "username", "email", "createdAt"],
    });

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// ✅ Modifier le profil d'un utilisateur
export const updateUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = await UserModel.findByPk(req.params.id);

    if (!user) return res.status(404).json({ message: "User not found" });

    // Si un nouveau mot de passe est fourni, on le hache
    let hashedPassword = user.password;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    // Mettre à jour l'utilisateur
    await user.update({
      username: username || user.username,
      email: email || user.email,
      password: hashedPassword,
    });

    res.json({ message: "User updated successfully", user });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// ✅ Supprimer un utilisateur
export const deleteUser = async (req, res) => {
  try {
    const user = await UserModel.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    await user.destroy();
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// ✅ Suivre/Désuivre un utilisateur
export const followUser = async (req, res) => {
  try {
    const userToFollow = await UserModel.findByPk(req.params.id);
    const currentUser = await UserModel.findByPk(req.user.id);

    if (!userToFollow || !currentUser)
      return res.status(404).json({ message: "User not found" });

    const followingList = currentUser.following || [];
    const followersList = userToFollow.followers || [];

    if (followingList.includes(userToFollow.id)) {
      // Désuivre
      currentUser.following = followingList.filter((id) => id !== userToFollow.id);
      userToFollow.followers = followersList.filter((id) => id !== currentUser.id);
    } else {
      // Suivre
      currentUser.following.push(userToFollow.id);
      userToFollow.followers.push(currentUser.id);
    }

    await currentUser.save();
    await userToFollow.save();

    res.json({ message: "Follow status updated", user: currentUser });
  } catch (error) {
    console.error("Error following user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
