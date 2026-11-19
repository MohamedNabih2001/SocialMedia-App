import mongoose from "mongoose";
const postModel = new mongoose.Schema(
  {
    caption: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    images: {
      type: [
        {
          imageUrl: { type: String },
          publicId: { type: String },
        },
      ],
      default: [],
    },
  },
  { timestamps: true },
);

export const Post = new mongoose.model("Post", postModel);
