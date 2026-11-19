import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

const userModel = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: [2, "Name must be more than 2"],
    },
    lastName: {
      type: String,
      required: true,
      minLength: [2, "Name must be more than 2"],
    },
    role: {
      type: String,
      default: "user",
      required: true,
      enum: ["user", "admin"],
    },
    theme: {
      type: String,
      default: "light",
      enum: ["light", "dark"],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: validator.isEmail,
        message: "Please provide a valid email",
      },
    },
    age: {
      type: Number,
      required: true,
      min: [13, "Age must be larger than 13"],
    },
    image: {
      type: {
        imageUrl: { type: String },
        publicId: { type: String },
      },
      default: {
        imageUrl:
          "https://res.cloudinary.com/djitv3kwb/image/upload/v1781046513/profileAdmin_vk79wj.png",
        publicId: "Social_Media/Users/profileAdmin_vk79wj",
      },
    },
    password: { type: String, required: true, select: false },
    passwordConfirm: {
      type: String,
      required: true,
      validate: {
        validator: function (value) {
          return value === this.password;
        },
        message: "Not Same Password",
      },
    },
    token: { type: String, default: null, select: false },
  },
  {
    timestamps: true,
  },
);

userModel.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
});
userModel.methods.checkPassword = async function (password) {
  const isSamePassword = await bcrypt.compare(password, this.password);
  return isSamePassword;
};

export const User = new mongoose.model("User", userModel);
