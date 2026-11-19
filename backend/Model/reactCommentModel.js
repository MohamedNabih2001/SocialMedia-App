import mongoose from "mongoose";
const reactCommentSchema = new mongoose.Schema(
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

    comment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
      required: true,
    },
  },
  { timestamps: true },
);
reactCommentSchema.index({ user: 1, comment: 1 }, { unique: true });

export const ReactComment = new mongoose.model(
  "ReactComment",
  reactCommentSchema,
);
