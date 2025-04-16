import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
  senderId: {
    type: Number, // Référence à un utilisateur (MySQL)
    required: true,
  },
  recipientId: {
    type: Number, // Référence à un utilisateur (MySQL)
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const MessageModel = mongoose.model("Message", MessageSchema);
export default MessageModel;
