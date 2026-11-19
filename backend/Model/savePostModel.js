import mongoose from "mongoose";

const savedPostSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        required: true,
        unique: true,
      },
    ],
  },
  { timestamps: true },
);

export const SavedPost = new mongoose.model("SavedPost", savedPostSchema);
