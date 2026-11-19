import { Friend } from "../Model/friendModel.js";
import { FriendRequest } from "../Model/friendRequest.js";
import { Notification } from "../Model/notificationModel.js";
import { AppError, catchAsync } from "../Utility/errorControler.js";
import {
  createNotification,
  getUserAndPopulate,
} from "../Utility/factoryHandler.js";

export const addFriendRequest = catchAsync(async (req, res, next) => {
  const user = req.user.id;
  if (!user) {
    return next(new AppError("Your aren`t allowed and please sign in ", 401));
  }
  const { receiver } = req.body;
  if (!receiver) {
    return next(new AppError("Not Valid Data", 409));
  }
  if (receiver.toString() === user.toString()) {
    return next();
  }
  const requestFriend = {
    sender: user.toString(),
    receiver,
    status: "pending",
  };
  const dataNotification = {
    sender: user,
    receiver,
    type: "friendRequest",
  };
  const data = await FriendRequest.create({ ...requestFriend });
  if (!data) {
    return next(new AppError("Something went wrong ", 404));
  }
  await createNotification(dataNotification);
  const message = `Request Friend Sent `;

  res.status(200).json({ message, data });
});

//////////////////////////////

export const rejectFriendRequest = catchAsync(async (req, res, next) => {
  const user = req.user.id;
  const requestId = req.params.id;
  if (!user) {
    return next(new AppError("Your aren`t allowe and please sign in ", 401));
  }
  if (!requestId) {
    return next(new AppError("Invalid Data ", 409));
  }

  const data = await FriendRequest.findOne({
    sender: requestId,
    receiver: user,
    status: "pending",
  });
  console.log(data);
  if (!data) {
    return next(new AppError("Something went wrong ", 404));
  }
  await FriendRequest.findByIdAndDelete(data._id);
  const notificationData = await Notification.findOneAndUpdate(
    {
      sender: data.sender,
      receiver: data.receiver,
      type: "friendRequest",
    },
    { type: "friendReject" },
  );
  const newNotiData = await Notification.create({
    sender: data.receiver,
    receiver: data.sender,
    isRead: false,
    type: "friendReject",
  });
  console.log("nott", notificationData);

  const message = `Reject Friend Request `;

  res.status(200).json({ message });
});

//////////////////////////////

export const acceptFriendRequest = catchAsync(async (req, res, next) => {
  const user = req.user.id;
  const requestId = req.params.id;
  if (!user) {
    return next(new AppError("Your aren`t allowe and please sign in ", 401));
  }
  if (!requestId) {
    return next(new AppError("Invalid Data ", 409));
  }
  const data = await FriendRequest.findOne({
    sender: requestId,
    receiver: user,
    status: "pending",
  });
  if (!data) {
    return next(new AppError("Something went wrong ", 404));
  }

  const newFriendRequest = await FriendRequest.findByIdAndUpdate(
    data._id,
    { status: "accepted" },
    { returnDocument: "after" },
  );

  const friendsData = await Friend.findOneAndUpdate(
    { user },
    {
      $addToSet: { friends: data.sender },
    },
    { returnDocument: "after", setDefaultsOnInsert: true, upsert: true },
  );
  await Friend.findOneAndUpdate(
    { user: data.sender },
    {
      $addToSet: { friends: user },
    },
    { returnDocument: "after", setDefaultsOnInsert: true, upsert: true },
  );
  const notificationData = await Notification.findOneAndUpdate(
    {
      sender: data.sender,
      receiver: data.receiver,
      type: "friendRequest",
    },
    { type: "friendAccept" },
  );
  const newNotiData = await Notification.create({
    sender: data.receiver,
    receiver: data.sender,
    isRead: false,
    type: "friendAccept",
  });
  const message = `Accept Friend Request `;

  res.status(200).json({ message });
});

//////////////////////////////

export const removeFriend = catchAsync(async (req, res, next) => {
  const user = req.user.id;
  const friendId = req.params.id;
  if (!user) {
    return next(new AppError("Your aren`t allowe and please sign in ", 401));
  }
  if (!friendId) {
    return next(new AppError("Invalid Data ", 409));
  }

  const data = await Friend.findOne({ user });
  if (!data) {
    return next(
      new AppError("You dont have any friends please add friends", 404),
    );
  }

  const friendExist = data.friends.findIndex(
    (friend) => friend.toString() === friendId.toString(),
  );
  let friendsData;
  if (friendExist === -1) {
    return next(new AppError("this friend is not your friend", 403));
  } else {
    friendsData = await Friend.findByIdAndUpdate(
      data._id,
      {
        $pull: { friends: friendId },
      },
      { returnDocument: "after" },
    );
    await Friend.findOneAndUpdate(
      { user: friendId },
      {
        $pull: { friends: user },
      },
    );

    const friendship = await FriendRequest.findOne({
      status: "accepted",
      $or: [
        {
          sender: friendId,
          receiver: user,
        },
        {
          sender: user,
          receiver: friendId,
        },
      ],
    });
    if (!friendship) {
      return next(new AppError("cant find friend request", 403));
    }
    if (friendship) {
      await FriendRequest.findByIdAndDelete(friendship._id);
    }
  }
  const message = `Remove Friend Successfully `;

  res.status(200).json({ message, data: friendsData });
});

//////////////////////////////

export const isFriendForMe = catchAsync(async (req, res, next) => {
  const me = req.user.id;
  const person = req.params.id;
  if (!me) {
    return next(new AppError("You are not allowed to this"), 401);
  }
  if (person.toString() === me.toString()) {
    return next();
  }
  const isInFriendList = await Friend.exists({
    user: me,
    friends: person,
  });
  const isFriendRequest = await FriendRequest.findOne({
    sender: me,
    receiver: person,
  });
  const isIRequest = await FriendRequest.findOne({
    sender: person,
    receiver: me,
  });
  const isFriend = isInFriendList
    ? "friend"
    : isFriendRequest || isIRequest
      ? "requestSend"
      : "notFriend";
  const message = `${isFriend === "friend" ? "He is already your friend" : "He is not friend yet "}`;
  res.json({
    message,
    data: {
      isFriend,
    },
  });
});

//////////////////////////////

export const getFriends = getUserAndPopulate(Friend, "friends");
///////////////////////////////////////

export const getFriendRequsts = catchAsync(async (req, res, next) => {
  const user = req.user.id;
  if (!user) {
    return next(new AppError("Not Signed", 401));
  }
  const friendRequests = await FriendRequest.find({
    receiver: user,
    status: "pending",
  })
    .populate("sender")
    .sort("-updatedAt");
  if (!friendRequests) {
    return next(new AppError("Not Exist", 404));
  }
  const message = `Get Requests SuccessFully`;
  res.json({ message, data: friendRequests });
});
