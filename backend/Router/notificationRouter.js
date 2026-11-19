import express from "express";
import { authMeFunction } from "../Controller/authController.js";
import {
  deleteNotification,
  getUserNotification,
  makeIsRead,
} from "../Controller/notificationController.js";
const notificationRouter = express.Router();
notificationRouter.route("/").get(authMeFunction, getUserNotification);
notificationRouter
  .route("/:id")
  .put(authMeFunction, makeIsRead)
  .delete(authMeFunction, deleteNotification);

export default notificationRouter;
