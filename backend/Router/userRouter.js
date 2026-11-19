import express from "express";
import { upload } from "../Utility/cloudinary.js";
import {
  authMeFunction,
  getMeFunction,
  logOut,
  refreshTokenFunction,
  signIn,
  signUp,
} from "../Controller/authController.js";
import { getUserData, updateUser } from "../Controller/userController.js";
const userRouter = express.Router();

userRouter
  .route("/")
  .put(signIn)
  .post(upload.single("image"), signUp)
  .delete(authMeFunction, logOut);
userRouter.route("/refresh").get(refreshTokenFunction);
userRouter.route("/me").get(authMeFunction, getMeFunction);
userRouter.route("/:id").get(authMeFunction, getUserData);
userRouter
  .route("/me/:id")
  .put(authMeFunction, upload.single("image"), updateUser);

export default userRouter;
