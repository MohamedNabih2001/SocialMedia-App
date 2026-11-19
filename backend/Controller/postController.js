import { Post } from "../Model/postModel.js";
import {
  addOneWithImages,
  deletePostWithImages,
  getBypages,
  getGroup,
  getOne,
  getUser,
  updateOneWithImages,
} from "../Utility/factoryHandler.js";

export const addPost = addOneWithImages("Posts", Post);
export const getPosts = getBypages(Post);
export const getPost = getOne(Post);
export const getSomeonePosts = getGroup(Post);
export const getUserPosts = getUser(Post);
export const updatePost = updateOneWithImages("Posts", Post);
export const deletePost = deletePostWithImages();
