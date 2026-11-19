import { Comment } from "../Model/commentModel.js";
import {
  addOneWihNotification,
  deleteOne,
  getGroupNumberPost,
  getGroupPost,
  updateOneWihNotification,
} from "../Utility/factoryHandler.js";

export const getComments = getGroupPost(Comment, "user");
export const getCommentsNumber = getGroupNumberPost(Comment);
export const addComment = addOneWihNotification("postComment", Comment);
export const updateComment = updateOneWihNotification("postComment", Comment);
export const deleteComment = deleteOne(Comment);
