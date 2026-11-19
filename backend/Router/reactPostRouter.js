import express from "express";
import { authMeFunction } from "../Controller/authController.js";
import {
  addReactPost,
  deleteReactPost,
  getReactPost,
  getReactPostCount,
  isUserReactPost,
  updateReactPost,
} from "../Controller/reactPostController.js";

const reactPostRouter = express.Router();
reactPostRouter.route("/").post(authMeFunction, addReactPost);
reactPostRouter
  .route("/:id")
  .delete(authMeFunction, deleteReactPost)
  .put(authMeFunction, updateReactPost);
reactPostRouter.route("/post/:id").get(authMeFunction, getReactPost);
reactPostRouter.route("/post/:id/count").get(authMeFunction, getReactPostCount);
reactPostRouter.route("/post/:id/user").get(authMeFunction, isUserReactPost);

export default reactPostRouter;
