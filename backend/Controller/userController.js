import { User } from "../Model/userModel.js";
import {
  getOneWithOutUser,
  updateOneWithImage,
} from "../Utility/factoryHandler.js";

export const updateUser = updateOneWithImage("Users", User);
export const getUserData = getOneWithOutUser(User);
