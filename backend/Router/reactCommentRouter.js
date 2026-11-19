import express from "express";
import { authMeFunction } from "../Controller/authController.js";
import {
  addReactComment,
  deleteReactComment,
  getReactComment,
  getReactCommentCount,
  isUserReactComment,
  updateReactComment,
} from "../Controller/reactCommentController.js";

const reactCommentRouter = express.Router();
reactCommentRouter.route("/").post(authMeFunction, addReactComment);
reactCommentRouter
  .route("/:id")
  .delete(authMeFunction, deleteReactComment)
  .put(authMeFunction, updateReactComment);
reactCommentRouter.route("/comment/:id").get(authMeFunction, getReactComment);
reactCommentRouter
  .route("/comment/:id/count")
  .get(authMeFunction, getReactCommentCount);
reactCommentRouter
  .route("/comment/:id/user")
  .get(authMeFunction, isUserReactComment);

export default reactCommentRouter;
