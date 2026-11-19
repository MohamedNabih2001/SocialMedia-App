import { Notification } from "../Model/notificationModel.js";
import cloudinary, { UploadToCloudinary } from "./cloudinary.js";
import { AppError, catchAsync } from "./errorControler.js";
import { Comment } from "./../Model/commentModel.js";
import { Post } from "../Model/postModel.js";
import { ReactPost } from "../Model/reactPostModel.js";
import { ReactComment } from "../Model/reactCommentModel.js";
import { getIo } from "./socket.js";

export const getOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const id = req.params.id;
    const data = await Model.findById(id).populate("user");
    const message = `Get ${Model.modelName} Successfully`;
    res.json({ message, data });
  });

//////////////////////////////////////
export const getOneWithOutUser = (Model) =>
  catchAsync(async (req, res, next) => {
    const id = req.params.id;
    const data = await Model.findById(id);
    const message = `Get ${Model.modelName} Successfully`;
    res.json({ message, data });
  });

//////////////////////////////////////
export const getGroupPost = (Model, populateField) =>
  catchAsync(async (req, res, next) => {
    const id = req.params.id;
    const isExistReacts = await Model.exists({ post: id });
    if (!isExistReacts) {
      const message = `No ${Model.modelName}`;
      return res.json({ message, data: [] });
    }
    const data = await Model.find({ post: id }).populate(populateField);

    const message = `Get ${Model.modelName} Successfully`;
    res.json({ message, data });
  });

//////////////////////////////////////
export const getGroupComment = (Model, populateField) =>
  catchAsync(async (req, res, next) => {
    const id = req.params.id;
    const isExistReacts = await Model.exists({ comment: id });
    if (!isExistReacts) {
      const message = `No ${Model.modelName}`;
      return res.json({ message, data: [] });
    }
    const data = await Model.find({ comment: id }).populate(populateField);

    const message = `Get ${Model.modelName} Successfully`;
    res.json({ message, data });
  });

//////////////////////////////////////

export const getGroupNumberPost = (Model) =>
  catchAsync(async (req, res, next) => {
    const id = req.params.id;
    const isExistReacts = await Model.exists({ post: id });
    if (!isExistReacts) {
      const message = `No ${Model.modelName}`;
      return res.json({ message, number: 0 });
    }
    const data = await Model.countDocuments({ post: id });

    const message = `Get ${Model.modelName} Successfully`;
    res.json({ message, number: data });
  });

//////////////////////////////////////

export const getIsUserReacted = (type) =>
  catchAsync(async (req, res, next) => {
    const id = req.params.id;
    const userId = req.user.id;
    if (type === "post") {
      const postReacts = await ReactPost.find({ post: id.toString() });
      if (!postReacts) {
        const message = `No reacts`;
        return res.json({ message, userReact: false });
      }
      const isUserExist = postReacts.find(
        (post) => post.user.toString() === userId.toString(),
      );
      const userReactData = isUserExist ? { ...isUserExist } : false;
      const message = `Get User React Successfully`;
      res.json({ message, userReact: userReactData._doc });
    }
    if (type === "comment") {
      const commentReacts = await ReactComment.find({ comment: id.toString() });
      if (!commentReacts) {
        const message = `No reacts`;
        return res.json({ message, userReact: false });
      }
      const isUserExist = commentReacts.find(
        (comment) => comment.user.toString() === userId.toString(),
      );
      const userReactData = isUserExist ? { ...isUserExist } : false;
      const message = `Get User React Successfully`;
      res.json({ message, userReact: userReactData._doc });
    }
  });

//////////////////////////////////////
export const getGroupNumberComment = (Model) =>
  catchAsync(async (req, res, next) => {
    const id = req.params.id;
    const isExistReacts = await Model.exists({ comment: id });
    if (!isExistReacts) {
      const message = `No ${Model.modelName}`;
      return res.json({ message, number: 0 });
    }
    const data = await Model.countDocuments({ comment: id });

    const message = `Get ${Model.modelName} Successfully`;
    res.json({ message, number: data });
  });

////////////////////////////////////

export async function createNotification({
  sender,
  receiver,
  type,
  post,
  comment,
}) {
  if (sender.toString() === receiver.toString()) {
    return;
  }

  const not = await Notification.create({
    sender,
    receiver,
    type,
    post,
    comment,
    isRead: false,
  });
  return not;
}

//////////////////////////////////////

export const getGroup = (Model) =>
  catchAsync(async (req, res, next) => {
    const id = req.params.id;
    console.log("query", req.query, id);
    let searchQuery = { ...req.query };
    let page = Number(req.query.page) || 1;
    let limit = Number(req.query.limit) || 10;
    let sort = req.query.sort || "-createdAt";
    let fields = req.query.fields
      ? req.query.fields.split(",").join(" ")
      : "-__v";
    delete searchQuery.sort;
    delete searchQuery.page;
    delete searchQuery.limit;
    delete searchQuery.fields;
    const stringSQ = JSON.stringify(searchQuery);
    const handledSQ = stringSQ.replace(
      /\b(gt|gte|lte|lt)\b/g,
      (match) => `$${match}`,
    );
    const usedSQ = JSON.parse(handledSQ);
    usedSQ.user = id.toString();
    console.log("usedSq", usedSQ);

    const count = await Model.countDocuments(usedSQ);
    const skip = (page - 1) * limit;
    const totalPages = Math.ceil(count / limit);
    if (page > totalPages || count === 0) {
      return res.json({
        message: "No data exist in this page",
        data: [],
        currentPage: page,
        limit,
        count,
        totalPages,
        resultsNumber: 0,
      });
    }

    const data = await Model.find(usedSQ)
      .sort(sort)
      .limit(limit)
      .skip(skip)
      .select(fields)
      .populate("user");
    const resultsNumber = data.length;
    const message = `Get ${Model.modelName}s Successfully`;

    res.json({
      message,
      data,
      currentPage: page,
      limit,
      count,
      totalPages,
      resultsNumber,
    });
  });

//////////////////////////////////////
export const getUser = (Model) =>
  catchAsync(async (req, res, next) => {
    const message = `Get ${Model.modelName}s Successfully`;
    const user = req.user.id;
    const data = await Model.findOne({ user });
    res.json({ message, data });
  });

//////////////////////////////////////
export const getUserAndPopulate = (Model, populatefield) =>
  catchAsync(async (req, res, next) => {
    const message = `Get ${Model.modelName}s Successfully`;
    const user = req.user.id;
    const data = await Model.findOne({ user }).populate(populatefield);
    res.json({ message, data });
  });

//////////////////////////////////////

export const getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    const message = `Get ${Model.modelName}s Successfully`;
    const data = await Model.find();
    res.json({ message, data });
  });

/////////////////////////////////////

export const getBypages = (Model) =>
  catchAsync(async (req, res, next) => {
    console.log("query", req.query);
    const message = `Get ${Model.modelName}s Successfully`;
    let searchQuery = { ...req.query };
    let page = Number(req.query.page) || 1;
    let limit = Number(req.query.limit) || 10;
    let sort = req.query.sort || "-createdAt";
    let fields = req.query.fields
      ? req.query.fields.split(",").join(" ")
      : "-__v";
    delete searchQuery.sort;
    delete searchQuery.page;
    delete searchQuery.limit;
    delete searchQuery.fields;
    const stringSQ = JSON.stringify(searchQuery);
    const handledSQ = stringSQ.replace(
      /\b(gt|gte|lte|lt)\b/g,
      (match) => `$${match}`,
    );
    const usedSQ = JSON.parse(handledSQ);
    console.log("used", usedSQ);

    const count = await Model.countDocuments(usedSQ);
    const skip = (page - 1) * limit;
    const totalPages = Math.ceil(count / limit);
    if (page > totalPages || count === 0) {
      return res.json({
        message: "No data exist in this page",
        data: [],
        currentPage: page,
        limit,
        count,
        totalPages,
        resultsNumber: 0,
      });
    }

    const data = await Model.find(usedSQ)
      .sort(sort)
      .limit(limit)
      .skip(skip)
      .select(fields)
      .populate("user");
    const resultsNumber = data.length;

    res.json({
      message,
      data,
      currentPage: page,
      limit,
      count,
      totalPages,
      resultsNumber,
    });
  });
/////////////////////////////////////

export const addOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const user = req.user.id;
    const data = await Model.create({ user, ...req.body });

    const message = `Add ${data.name} Successfully`;
    res.json({ message, data });
  });
/////////////////////////////////////

export const addOneWithImage = (Model, imageFolder) =>
  catchAsync(async (req, res, next) => {
    const uploadImage = await UploadToCloudinary(imageFolder, req.file.buffer);
    const user = req.user.id;
    const image = {
      imageUrl: uploadImage.secure_url,
      publicId: uploadImage.public_id,
    };

    const data = await Model.create({ ...req.body, user, image });

    const message = `Add ${data.name} Successfully`;
    res.json({ message, data });
  });
/////////////////////////////////////

export const addOneWithImages = (imageFolder, Model) =>
  catchAsync(async (req, res, next) => {
    console.log(req.body);
    const user = req.user.id;
    console.log(req.files);
    const uploadPromises = req.files.map((file) =>
      UploadToCloudinary(imageFolder, file.buffer),
    );
    const uploadImages = await Promise.all(uploadPromises);
    const images = uploadImages.map((image) => {
      return {
        imageUrl: image.secure_url,
        publicId: image.public_id,
      };
    });
    const data = await Model.create({ ...req.body, user, images });
    const message = `Add ${Model.modelName} Successfully`;
    res.json({ message, data });
  });
/////////////////////////////////////

export const updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const id = req.params.id;
    const userId = req.user.id;
    const dataToUpdate = await Model.findOne({ _id: id });
    if (!dataToUpdate) {
      return next(new AppError("Data isn`t exist ", 404));
    }
    const userDataId = dataToUpdate.user.toString();
    if (userDataId !== userId) {
      return next(
        new AppError("Your are not allowed to update this data", 403),
      );
    }
    const data = await Model.findByIdAndUpdate(id, req.body, {
      returnDocument: "after",
      runValidators: true,
    });
    const message = `Update ${Model.modelName} Successfully`;

    res.status(200).json({ message, data });
  });
/////////////////////////////////////

export const addOneWihNotification = (NotificationType, Model) =>
  catchAsync(async (req, res, next) => {
    const user = req.user.id;
    if (!user) {
      return next(new AppError("Your are not allowed to do this", 401));
    }
    const io = getIo();

    const data = await Model.create({ user, ...req.body });
    if (data.comment) {
      const dataParent = await Comment.findById(data.comment);
      if (user.toString() !== dataParent.user.toString()) {
        const notificationData = await Notification.create({
          sender: user,
          receiver: dataParent.user,
          type: NotificationType,
          post: dataParent.post,
          comment: dataParent._id,
        });

        io.to(dataParent.user.toString()).emit(`new${Model.modelName}`, data);
        io.to(dataParent.user.toString()).emit("newNotification", {
          data: notificationData,
        });
      }
    } else if (!data.comment && data.post) {
      const dataParent = await Post.findById(data.post);
      if (user.toString() !== dataParent.user.toString()) {
        const notificationData = await Notification.create({
          sender: user,
          receiver: dataParent.user,
          type: NotificationType,
          post: dataParent._id,
          isRead: false,
        });
        io.to(dataParent.user.toString()).emit(`new${Model.modelName}`, data);
        io.to(dataParent.user.toString()).emit("newNotification", {
          data: notificationData,
        });
      }
    }
    const message = `Add ${Model.modelName} Successfully`;
    res.json({ message, data });
  });
/////////////////////////////////////

export const updateOneWihNotification = (NotificationType, Model) =>
  catchAsync(async (req, res, next) => {
    const user = req.user.id;
    const id = req.params.id;

    if (!user) {
      return next(new AppError("Your are not allowed to do this", 401));
    }
    const io = getIo();
    const data = await Model.findByIdAndUpdate(
      id,
      { ...req.body },
      { returnDocument: "after" },
    );
    if (data.comment) {
      const dataParent = await Comment.findById(data.comment);
      const notificationData = await createNotification({
        sender: user,
        receiver: dataParent.user,
        type: NotificationType,
        post: dataParent.post,
        comment: dataParent._id,
      });
      io.to(dataParent.user.toString()).emit(`new${Model.modelName}`, data);
      io.to(dataParent.user.toString()).emit("newNotification", {
        data: notificationData,
      });
    } else if (!data.comment && data.post) {
      const dataParent = await Post.findById(data.post);
      const notificationData = await createNotification({
        sender: user,
        receiver: dataParent.user,
        type: NotificationType,
        post: dataParent._id,
      });

      io.to(dataParent.user.toString()).emit(`new${Model.modelName}`, data);
      io.to(dataParent.user.toString()).emit("newNotification", {
        data: notificationData,
      });
    }
    const message = `Add ${Model.modelName} Successfully`;
    res.json({ message, data });
  });

/////////////////////////////////////
export const updateOneWithImages = (imageFolder, Model) =>
  catchAsync(async (req, res, next) => {
    let updatedData = { ...req.body };
    let deletedImages;
    console.log(req.body);
    if (updatedData.deletedImages) {
      delete updatedData.deletedImages;
    }
    delete updatedData.images;
    let images;
    if (req.body.deletedImages) {
      deletedImages = JSON.parse(req.body.deletedImages);
      // JSON.parse([...req.body.deletedImages] || "[]")
    }

    const id = req.params.id;
    const userId = req.user.id;
    const dataToUpdate = await Model.findOne({ _id: id });
    if (!dataToUpdate) {
      return next(new AppError("Data isn`t exist ", 404));
    }
    const userDataId = dataToUpdate.user.toString();
    if (userDataId !== userId.toString()) {
      return next(
        new AppError("Your are not allowed to update this data", 403),
      );
    }
    images = dataToUpdate ? [...dataToUpdate.images] : [];
    console.log("images1", images);
    if (deletedImages) {
      await Promise.all(
        deletedImages.map((img) => cloudinary.uploader.destroy(img.publicId)),
      );

      images = images.filter((image) => {
        return !deletedImages.some(
          (delImage) => delImage.publicId === image.publicId,
        );
      });
    }

    if (req.files) {
      const uploadPromises = req.files.map((file) =>
        UploadToCloudinary(imageFolder, file.buffer),
      );
      const uploadImages = await Promise.all(uploadPromises);
      const newImages = uploadImages.map((image) => {
        return {
          imageUrl: image.secure_url,
          publicId: image.public_id,
        };
      });
      images = images.concat(newImages);
    }

    const data = await Model.findByIdAndUpdate(
      id,
      { images, ...updatedData },
      {
        returnDocument: "after",
        runValidators: true,
      },
    );
    const message = `Update ${Model.modelName} Successfully`;

    res.status(200).json({ message, data });
  });
///////////////////////////////////////////
export const updateOneWithImage = (imageFolder, Model) =>
  catchAsync(async (req, res, next) => {
    let updatedData = { ...req.body };
    console.log("updatedData", updatedData);
    const id = req.params.id;
    const userId = req.user.id;
    const dataToUpdate = await Model.findOne({ _id: id });
    if (!dataToUpdate) {
      return next(new AppError("Data isn`t exist ", 404));
    }
    if (id !== userId.toString()) {
      console.log(id, userId);
      const userDataId = dataToUpdate.user.toString();
      if (userDataId !== userId.toString()) {
        return next(
          new AppError("Your are not allowed to update this data", 403),
        );
      }
    }
    if (!req.file) {
      const data = await Model.findByIdAndUpdate(
        id,
        { ...updatedData },
        {
          returnDocument: "after",
          runValidators: true,
        },
      );
      const message = `Update ${Model.modelName} Successfully`;

      return res.status(200).json({ message, data });
    }

    await cloudinary.uploader.destroy(dataToUpdate.image.publicId);

    const uploadImage = await UploadToCloudinary(imageFolder, req.file.buffer);

    const newImage = {
      imageUrl: uploadImage.secure_url,
      publicId: uploadImage.public_id,
    };

    const data = await Model.findByIdAndUpdate(
      id,
      { image: newImage, ...updatedData },
      {
        returnDocument: "after",
        runValidators: true,
      },
    );
    const message = `Update ${Model.modelName} Successfully`;

    res.status(200).json({ message, data });
  });
///////////////////////////////////////////
export const deleteOneWithImage = (imageFolder, Model) =>
  catchAsync(async (req, res, next) => {
    const id = req.params.id;
    const userId = req.user.id;
    const dataToDelete = await Model.findOne({ _id: id });
    if (!dataToDelete) {
      return next(new AppError("Data isn`t exist ", 404));
    }
    const userDataId = dataToDelete.user.toString();
    if (userDataId !== userId) {
      return next(
        new AppError("Your are not allowed to update this data", 403),
      );
    }

    await cloudinary.uploader.destroy(dataToDelete.image.publicId);

    const data = await Model.findByIdAndDelete(id);
    const message = `Delete ${Model.modelName} Successfully`;

    res.status(200).json({ message });
  });
///////////////////////////////////////////

export const deleteOneWithImages = (Model) =>
  catchAsync(async (req, res, next) => {
    const id = req.params.id;
    const userId = req.user.id;
    const dataToDelete = await Model.findOne({ _id: id });
    if (!dataToDelete) {
      return next(new AppError("Data isn`t exist ", 404));
    }
    const userDataId = dataToDelete.user.toString();
    if (userDataId !== userId) {
      return next(
        new AppError("Your are not allowed to update this data", 403),
      );
    }

    if (dataToDelete.images) {
      await Promise.all(
        dataToDelete.images.map((img) =>
          cloudinary.uploader.destroy(img.publicId),
        ),
      );
    }

    const data = await Model.findByIdAndDelete(id);
    const message = `Delete ${Model.modelName} Successfully`;

    res.status(200).json({ message });
  });

/////////////////////////////////////
export const deletePostWithImages = () =>
  catchAsync(async (req, res, next) => {
    const id = req.params.id;
    const userId = req.user.id;
    const dataToDelete = await Post.findById(id);
    if (!dataToDelete) {
      return next(new AppError("Data isn`t exist ", 404));
    }
    const userDataId = dataToDelete.user.toString();
    if (userDataId !== userId.toString()) {
      return next(
        new AppError("Your are not allowed to update this data", 403),
      );
    }

    if (dataToDelete.images) {
      await Promise.all(
        dataToDelete.images.map((img) =>
          cloudinary.uploader.destroy(img.publicId),
        ),
      );
    }

    const data = await Post.findByIdAndDelete(id);
    await Comment.deleteMany({ post: id });
    await ReactPost.deleteMany({ post: id });
    await ReactComment.deleteMany({ post: id });
    const message = `Delete Post Successfully`;

    res.status(200).json({ message });
  });

/////////////////////////////////////

export const deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const id = req.params.id;
    const userId = req.user.id;
    const dataToDelete = await Model.findById(id);
    if (!dataToDelete) {
      return next(new AppError("Data isn`t exist ", 404));
    }
    const userDataId =
      dataToDelete?.user?.toString() || dataToDelete?.receiver?.toString();
    if (userDataId.toString() !== userId.toString()) {
      return next(
        new AppError("Your are not allowed to delete this data", 403),
      );
    }
    const data = await Model.findByIdAndDelete(id, {
      returnDocument: "before",
    });
    const message = `Delete ${Model.modelName} Successfully`;
    const io = getIo();
    console.log(dataToDelete);
    if (dataToDelete.user)
      io.to(dataToDelete.user.toString()).emit(
        `delete${Model.modelName}`,
        data,
      );

    res.status(200).json({ message });
  });
