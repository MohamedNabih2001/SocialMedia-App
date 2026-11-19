import express from "express";
import { authMeFunction } from "../Controller/authController.js";
import {
  addSavedPosts,
  getSavedPosts,
  removeSavedPosts,
} from "../Controller/savedPostController.js";

const savedPostRouter = express.Router();
savedPostRouter.route("/").get(authMeFunction, getSavedPosts);
savedPostRouter
  .route("/:id")
  .post(authMeFunction, addSavedPosts)
  .delete(authMeFunction, removeSavedPosts);
export default savedPostRouter;
