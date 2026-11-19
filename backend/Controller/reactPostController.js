import {
  addOneWihNotification,
  deleteOne,
  getGroupNumberPost,
  getGroupPost,
  getIsUserReacted,
  updateOneWihNotification,
} from "../Utility/factoryHandler.js";
import { ReactPost } from "./../Model/reactPostModel.js";

export const addReactPost = addOneWihNotification("postReact", ReactPost);
export const updateReactPost = updateOneWihNotification("postReact", ReactPost);
export const deleteReactPost = deleteOne(ReactPost);
export const getReactPost = getGroupPost(ReactPost, "user");
export const getReactPostCount = getGroupNumberPost(ReactPost);
export const isUserReactPost = getIsUserReacted("post");
