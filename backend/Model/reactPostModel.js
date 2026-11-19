import mongoose from "mongoose";
const reactPostSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["like", "love", "haha", "wow", "sad", "angry"],
      default: "like",
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
  },
  { timestamps: true },
);
reactPostSchema.index({ user: 1, post: 1 }, { unique: true });
export const ReactPost = new mongoose.model("ReactPost", reactPostSchema);
