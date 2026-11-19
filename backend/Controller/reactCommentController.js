import { ReactComment } from "../Model/reactCommentModel.js";
import {
  addOneWihNotification,
  deleteOne,
  getGroupComment,
  getGroupNumberComment,
  getIsUserReacted,
  updateOneWihNotification,
} from "../Utility/factoryHandler.js";

export const addReactComment = addOneWihNotification(
  "commentReact",
  ReactComment,
);
export const deleteReactComment = deleteOne(ReactComment);
export const getReactComment = getGroupComment(ReactComment);
export const getReactCommentCount = getGroupNumberComment(ReactComment);
export const updateReactComment = updateOneWihNotification(
  "commentReact",
  ReactComment,
);
export const isUserReactComment = getIsUserReacted("comment");
