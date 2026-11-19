import express from "express";
import { authMeFunction } from "./../Controller/authController.js";
import {
  addComment,
  deleteComment,
  getComments,
  getCommentsNumber,
  updateComment,
} from "../Controller/commentController.js";
import { getReactComment } from "../Controller/reactCommentController.js";
const commentRouter = express.Router();

commentRouter.route("/").post(authMeFunction, addComment);
commentRouter
  .route("/:id")
  .get(getComments)
  .delete(authMeFunction, deleteComment)
  .put(authMeFunction, updateComment);
commentRouter.route("/:id/react").get(getReactComment);
commentRouter.route("/:id/count").get(getCommentsNumber);

export default commentRouter;
