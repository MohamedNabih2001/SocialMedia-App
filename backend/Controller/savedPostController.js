import { SavedPost } from "../Model/savePostModel.js";
import { catchAsync } from "../Utility/errorControler.js";
import { getUser } from "../Utility/factoryHandler.js";

export const getSavedPosts = getUser(SavedPost);

//////////////////////////////////

export const addSavedPosts = catchAsync(async (req, res, next) => {
  const user = req.user.id;
  const postId = req.params.id;
  const userPosts = await SavedPost.findOne({ user });
  const postIndex =
    userPosts?.posts.findIndex(
      (post) => post.toString() === postId.toString(),
    ) ?? -1;
  const isExist = postIndex !== -1 ? true : false;
  if (isExist) {
    return next("post is saved already", 404);
  }
  let data;

  if (!isExist && userPosts) {
    data = await SavedPost.findOneAndUpdate(
      { user },
      { $addToSet: { posts: postId } },
      { returnDocument: "after", upsert: true },
    );
  }
  if (!userPosts) {
    data = await SavedPost.findOneAndUpdate(
      { user },
      { $addToSet: { posts: postId } },
      { returnDocument: "after", upsert: true },
    );
  }
  const message = `Post is ${isExist ? "Remove from save" : "Saved"} successfully`;
  res.json({ message, data });
});

//////////////////////////////////

export const removeSavedPosts = catchAsync(async (req, res, next) => {
  const user = req.user.id;
  const postId = req.params.id;
  const userPosts = await SavedPost.findOne({ user });
  if (!userPosts) {
    return next("you have not posts to delete", 404);
  }
  const postIndex =
    userPosts?.posts.findIndex(
      (post) => post.toString() === postId.toString(),
    ) ?? -1;
  const isExist = postIndex !== -1 ? true : false;

  if (!isExist) {
    return next("post is not exist cannt delete", 404);
  }

  const data = await SavedPost.findOneAndUpdate(
    { user },
    { $pull: { posts: postId } },
    { returnDocument: "after" },
  );

  const message = `Post is ${isExist ? "Remove from save" : "Saved"} successfully`;
  res.json({ message, data });
});
