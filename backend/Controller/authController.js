import { promisify } from "util";
import { User } from "../Model/userModel.js";
import { UploadToCloudinary } from "../Utility/cloudinary.js";
import { AppError, catchAsync } from "../Utility/errorControler.js";
import jwt from "jsonwebtoken";
import {
  createAccessToken,
  createRefreshToken,
  refreshTokenOptions,
} from "../Utility/tokens.js";

export const signUp = catchAsync(async (req, res, next) => {
  const userData = { ...req.body };
  const userExist = await User.findOne({ email: userData.email });
  if (!userData) {
    return next(new AppError("Not Valid Data", 400));
  }
  if (userExist) {
    return next(new AppError("This user is exist", 409));
  }
  const isSamePassword = userData.password === userData.passwordConfirm;
  if (!isSamePassword) {
    return next(new AppError("Not Valid Data", 400));
  }
  let image;
  if(req.file?.buffer){
    const uploadImage = await UploadToCloudinary("Users", req.file.buffer);
    image = {
      imageUrl: uploadImage.secure_url,
      publicId: uploadImage.public_id,
    };

  }else{
    image ={
        imageUrl:
          "https://res.cloudinary.com/djitv3kwb/image/upload/v1781046513/profileAdmin_vk79wj.png",
        publicId: "Social_Media/Users/profileAdmin_vk79wj",
      }
  }
  const name = `${userData.firstName} ${userData.lastName}`;
  userData.role = userData.role ? userData.role : "user";
  const newUser = await User.create({
    ...userData,
    image,
    token: null,
  });
  const payload = {
    id: newUser._id,
    name,
    email: userData.email,
    role: userData.role || "user",
  };
  const refreshToken = createRefreshToken(payload);
  const accessToken = createAccessToken(payload);
  const newUserData = await User.findByIdAndUpdate(newUser._id, {
    token: refreshToken,
  });

  const message = `Create Account Successfully`;
  res.cookie("refreshToken", refreshToken, refreshTokenOptions);
  res.status(201).json({
    message,
    data: {
      token: accessToken,
      ...payload,
      theme: newUser.theme,
    },
  });
});

//////////////////////////////////////////

export const signIn = catchAsync(async (req, res, next) => {
  const userData = { ...req.body };
  const email = userData.email;
  const password = userData.password;

  if (!userData || !email || !password) {
    return next(new AppError("Not Valid Data", 400));
  }
  const user = await User.findOne({ email }).select("+password +token");
  if (!user) {
    return next(new AppError("This user isn`t exist", 401));
  }
  const isSamePassword = user.checkPassword(password);
  if (!isSamePassword) {
    return next(new AppError("please check password and email", 400));
  }

  const name = `${user.firstName} ${user.lastName}`;
  const role = user.role ? user.role : "user";
  const payload = {
    id: user._id,
    name,
    email: user.email,
    role,
  };
  const refreshToken = createRefreshToken(payload);
  const accessToken = createAccessToken(payload);
  const message = `Sign in Successfully`;
  console.log("from sig in", refreshToken);
  await User.findByIdAndUpdate(user._id, { token: refreshToken });
  res.cookie("refreshToken", refreshToken, refreshTokenOptions);
  res.status(200).json({
    message,
    data: { token: accessToken, ...payload, theme: user.theme },
  });
});

//////////////////////////////////////////

export const logOut = async (req, res, next) => {
  const userId = req.user.id;

  await User.findByIdAndUpdate(userId, {
    token: null,
  });

  res.clearCookie("refreshToken");

  res.status(200).json({
    message: "Logged out successfully",
  });
};

//////////////////////////////////////////

export const refreshTokenFunction = async (req, res, next) => {
  const oldRefreshToken = req.cookies.refreshToken;
  if (!oldRefreshToken) {
    return next(new AppError("Invalid Token", 401));
  }
  const user = await User.findOne({ token: oldRefreshToken.toString() }).select(
    "+token",
  );
  if (!user) {
    return next(new AppError("Invalid User", 401));
  }
  const name = `${user.firstName} ${user.lastName}`;
  const role = user.role ? user.role : "user";
  const payload = {
    id: user._id,
    name,
    email: user.email,
    role,
  };

  const refreshToken = createRefreshToken(payload);
  const newAccessToken = createAccessToken(payload);
  const newUser = await User.findByIdAndUpdate(user._id.toString(), {
    token: refreshToken,
  });
  console.log(oldRefreshToken, user, refreshToken, newUser);

  res.clearCookie("refreshToken");
  res.cookie("refreshToken", refreshToken, refreshTokenOptions);
  res.status(200).json({
    message: "Refresh token successfully",
    data: {
      token: newAccessToken,
      ...payload,
      theme: user.theme,
    },
  });
};

//////////////////////////////////////////

export const authMeFunction = async (req, res, next) => {
  if (
    !req.headers.authorization ||
    !req.headers.authorization.startsWith("Bearer")
  ) {
    return next(new AppError("Invalid Token", 401));
  }
  const token = req.headers.authorization.split(" ")[1];
  let decoded;
  try {
    decoded = await promisify(jwt.verify)(token, process.env.AT_SECRET);
  } catch (e) {
    return next(new AppError("Invalid Token", 401));
  }
  const user = await User.findOne({ email: decoded.email });
  if (!user) {
    return next(new AppError("Invalid User", 401));
  }
  req.user = {
    email: user.email,
    id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    role: user.role,
  };
  next();
};

export const getMeFunction = async (req, res, next) => {
  const { id } = req.user;
  const user = await User.findById(id.toString());
  return res.json({ message: "Get user successfuly", data: user });
};
