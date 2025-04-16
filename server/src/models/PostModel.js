import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  authorId: {
    type: Number, // Référence à un User (MySQL)
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  likes: {
    type: [Number], // Liste d'ID d'utilisateurs (MySQL) qui ont liké
    default: [],
  },
  comments: [
    {
      userId: Number, // Référence à un User (MySQL)
      content: String,
      createdAt: { type: Date, default: Date.now },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const PostModel = mongoose.model("Post", PostSchema);
export default PostModel;
