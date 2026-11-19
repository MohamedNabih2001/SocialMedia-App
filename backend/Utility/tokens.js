import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export const createRefreshToken = (payload) => {
  const token = jwt.sign(payload, process.env.RT_SECRET, { expiresIn: "40d" });
  return token;
};
export const createAccessToken = (payload) => {
  const token = jwt.sign(payload, process.env.AT_SECRET, { expiresIn: "20m" });
  return token;
};

export const refreshTokenOptions = {
  httpOnly: true,
  secure:  process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  maxAge: 40 * 24 * 60 * 60 * 1000,
};
