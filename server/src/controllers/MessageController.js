import MessageModel from "../models/MessageModel.js";

// ✅ Envoyer un message privé
export const sendMessage = async (req, res) => {
  try {
    const { recipientId, content } = req.body;

    const newMessage = new MessageModel({
      senderId: req.user.id,
      recipientId,
      content,
    });

    await newMessage.save();
    res.status(201).json({ message: "Message sent successfully", newMessage });
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// ✅ Récupérer tous les messages entre l'utilisateur connecté et un autre
export const getMessages = async (req, res) => {
  try {
    const { recipientId } = req.params;

    const messages = await MessageModel.find({
      $or: [
        { senderId: req.user.id, recipientId: Number(recipientId) },
        { senderId: Number(recipientId), recipientId: req.user.id },
      ],
    }).sort({ createdAt: 1 });

    res.json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
