import { Notification } from "../Model/notificationModel.js";
import { AppError, catchAsync } from "../Utility/errorControler.js";
import { deleteOne } from "../Utility/factoryHandler.js";

export const makeIsRead = catchAsync(async (req, res, next) => {
  const user = req.user.id;
  const notificationId = req.params.id;
  if (!user) {
    return next(new AppError("Not Signed", 401));
  }
  if (!notificationId) {
    return next(new AppError("Not Valid Data", 409));
  }
  const notification = await Notification.findById(notificationId);
  if (!notification) {
    return next(new AppError("Not Exist", 404));
  }
  const data = await Notification.findByIdAndUpdate(
    notification._id,
    { isRead: true },
    { returnDocument: "after", upsert: true },
  );
  const message = `Notification is marked Readed`;
  res.json({ message, data });
});

export const deleteNotification = deleteOne(Notification);

export const getUserNotification = catchAsync(async (req, res, next) => {
  const user = req.user.id;
  if (!user) {
    return next(new AppError("Not Signed", 401));
  }
  const notifications = await Notification.find({ receiver: user })
    .populate("sender")
    .sort("-updatedAt");
  if (!notifications) {
    return next(new AppError("Not Exist", 404));
  }
  const message = `Get Notifications SuccessFully`;
  res.json({ message, data: notifications });
});

////////////////////////////////////////////////////////////////
