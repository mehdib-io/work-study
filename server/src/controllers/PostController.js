import PostModel from "../models/PostModel.js";

// ✅ Récupérer tous les posts
export const getAllPosts = async (req, res) => {
  try {
    const posts = await PostModel.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// ✅ Créer un post
export const createPost = async (req, res) => {
  try {
    const { content } = req.body;

    const newPost = new PostModel({
      authorId: req.user.id,
      content,
    });

    await newPost.save();
    res.status(201).json({ message: "Post created successfully", post: newPost });
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// ✅ Liker un post
export const likePost = async (req, res) => {
  try {
    const post = await PostModel.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const userId = req.user.id;
    const alreadyLiked = post.likes.includes(userId);

    if (alreadyLiked) {
      post.likes = post.likes.filter((id) => id !== userId); // Retirer le like
    } else {
      post.likes.push(userId); // Ajouter le like
    }

    await post.save();
    res.json({ message: "Like status updated", post });
  } catch (error) {
    console.error("Error liking post:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// ✅ Commenter un post
export const commentPost = async (req, res) => {
  try {
    const post = await PostModel.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const newComment = {
      userId: req.user.id,
      content: req.body.content,
      createdAt: new Date(),
    };

    post.comments.push(newComment);
    await post.save();

    res.json({ message: "Comment added successfully", post });
  } catch (error) {
    console.error("Error commenting on post:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// ✅ Supprimer un post
export const deletePost = async (req, res) => {
  try {
    const post = await PostModel.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    if (post.authorId !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized to delete this post" });
    }

    await post.deleteOne();
    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
