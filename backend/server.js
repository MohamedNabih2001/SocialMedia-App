import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import compression from "compression";
import mongoSanitize from "express-mongo-sanitize";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import { globalErrorHandler } from "./Utility/errorControler.js";
import commentRouter from "./Router/commentRouter.js";
import postRouter from "./Router/postRouter.js";
import userRouter from "./Router/userRouter.js";
import reactCommentRouter from "./Router/reactCommentRouter.js";
import reactPostRouter from "./Router/reactPostRouter.js";
import notificationRouter from "./Router/notificationRouter.js";
import friendsRouter from "./Router/friendsRouter.js";

import http from "http";
import { getIo, initializeSocket } from "./Utility/socket.js";
dotenv.config();

const app = express();

export const server = http.createServer(app);
initializeSocket(server);

/////////////////////////////////////

app.use(helmet());

/////////////////////////////////////

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }),
);

/////////////////////////////////////

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
/////////////////////////////////////

app.use(compression());

/////////////////////////////////////

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

/////////////////////////////////////

app.use(cookieParser());

////////////////////////////////////

app.set("query parser", "extended");

/////////////////////////////////////
app.use((req, res, next) => {
  if (!req.query) {
    mongoSanitize(req);
  }

  next();
});

/////////////////////////////////////

app.use("/api/comments", commentRouter);
app.use("/api/notifications", notificationRouter);
app.use("/api/friends", friendsRouter);
app.use("/api/posts", postRouter);
app.use("/api/users", userRouter);
app.use("/api/reactsComments", reactCommentRouter);
app.use("/api/reactsPosts", reactPostRouter);
/////////////////////////////////////
app.use(globalErrorHandler);

/////////////////////////////////////
app.use((req, res) => {
  res.status(404).json({
    message: "Route not found",
  });
});
const port = process.env.PORT;
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("Mongo is connected"))
  .catch((err) => console.log(err));

server.listen(port, () => console.log(`Listen on port ${port}`));
