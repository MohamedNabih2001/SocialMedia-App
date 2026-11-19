import express from "express";
import {
  addPost,
  deletePost,
  getPost,
  getPosts,
  getSomeonePosts,
  updatePost,
} from "./../Controller/postController.js";
import { upload } from "../Utility/cloudinary.js";
import { authMeFunction } from "./../Controller/authController.js";
import { getReactPost } from "../Controller/reactPostController.js";
const postRouter = express.Router();

postRouter
  .route("/")
  .get(authMeFunction, getPosts)
  .post(authMeFunction, upload.array("images", 20), addPost);
postRouter
  .route("/:id")
  .get(authMeFunction, getPost)
  .delete(authMeFunction, deletePost)
  .put(authMeFunction, upload.array("images", 20), updatePost);
postRouter.route("/:id/react").get(getReactPost);

postRouter.route("/user/:id").get(authMeFunction, getSomeonePosts);

export default postRouter;
