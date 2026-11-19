import express from "express";
import { authMeFunction } from "../Controller/authController.js";
import {
  acceptFriendRequest,
  addFriendRequest,
  getFriendRequsts,
  getFriends,
  isFriendForMe,
  rejectFriendRequest,
  removeFriend,
} from "../Controller/friendsController.js";
const friendsRouter = express.Router();
friendsRouter
  .route("/")
  .get(authMeFunction, getFriends)
  .post(authMeFunction, addFriendRequest);
friendsRouter.route("/friendRequests").get(authMeFunction, getFriendRequsts);
friendsRouter.route("/:id").delete(authMeFunction, removeFriend);
friendsRouter.route("/isFriend/:id").get(authMeFunction, isFriendForMe);
friendsRouter.route("/:id/reject").put(authMeFunction, rejectFriendRequest);
friendsRouter.route("/:id/accept").put(authMeFunction, acceptFriendRequest);
export default friendsRouter;
