export type RefreshDataType = {
  name: string;
  id: string;
  role: string;
  token: string;
  email: string;
  theme: string;
};
export type ResponseRefresh = {
  message: string;
  data: RefreshDataType;
};
export type RegisterDataInput = {
  firstName: string;
  lastName: string;
  role: string;
  image: File;
  age: number;
  email: string;
  password: string;
  passwordConfirm: string;
};
// type UserPayload = {
//   name: string;
//   email: string;
//   role: string;
// };
export type AuthResponse = {
  message: string;
  data: {
    token: string;
    id: string;
    name: string;
    email: string;
    role: string;
    theme: string;
  };
};
export type UserImage = {
  _id: string;
  imageUrl: string;
  publicId: string;
};

export type User = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  role: 'user' | 'admin';
  theme: 'light' | 'dark';
  image: UserImage;
  createdAt: string;
  updatedAt: string;
  __v: number;
};
export type ResponseGetMe = {
  message: string;
  data: User;
};
export type ResponseMessage = {
  message: string;
};
export type SignInInput = {
  email: string;
  password: string;
};

export type DataPostType = {
  caption: string;
  images: UserImage[];
  user: string;
};
export type DataGetPostType = {
  _id: string;
  caption: string;
  images: UserImage[];
  user: User;
  createdAt: string;
  updatedAt: string;
};
export type ResponseAddPostType = {
  message: string;
  data: DataPostType;
};
export type ResponseGetPostType = {
  message: string;
  data: DataGetPostType;
};
export type ResponseGetPosts = {
  message: string;
  data: DataGetPostType[];
  currentPage: number;
  limit: number;
  count: number;
  totalPages: number;
  resultsNumber: number;
};
export type ResponseGetAnyUser = {
  message: string;
  data: User;
};
export type ResponseGetIsFriend = {
  message: string;
  data: { isFriend: string };
};
export type NotificationType = {
  post?: string;
  comment?: string;
  sender: User;
  receiver: string;
  isRead: boolean;
  _id: string;
  type: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};
export type ResponseGetNotifications = {
  message: string;
  data: NotificationType[];
};
export type ResponseGetNotification = {
  message: string;
  data: NotificationType;
};
export type FriendsDataType = {
  _id: string;
  user: string;
  __v: number;
  createdAt: string;
  friends: User[];
  updatedAt: string;
};
export type FriendRequestDataType = {
  _id: string;
  sender: User;
  receiver: string;
  __v: number;
  createdAt: string;
  status: string;
  updatedAt: string;
};
export type ResponseGetFriends = {
  message: string;
  data: FriendsDataType;
};
export type ResponseGetFriendsRequests = {
  message: string;
  data: FriendRequestDataType[];
};
export type DataInputReactPostType = {
  type: string;
  post: string;
};
export type ReactPostType = {
  type: 'like' | 'love' | 'haha' | 'wow' | 'sad' | 'angry';
  user: User;
  post: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};
export type CommentType = {
  text: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  post: string;
  user: User;
  parent: string;
};
export type CommentWithoutUserType = {
  text: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  post: string;
  user: string;
  parent: string;
};
export type ResponeReactPostType = {
  message: string;
  data: ReactPostType;
};
export type ResponePostReactsType = {
  message: string;
  data: ReactPostType[];
};
export type ResponePostCommentsType = {
  message: string;
  data: CommentType[];
};
export type ResponeCommentPostType = {
  message: string;
  data: CommentWithoutUserType;
};

export type DataInputReactCommentType = {
  type: string;
  post: string;
  comment: string;
};
export type ReactCommentType = {
  type: 'like' | 'love' | 'haha' | 'wow' | 'sad' | 'angry';
  user: string;
  post: string;
  comment: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};
export type DataReactCommentType = {
  type: 'like' | 'love' | 'haha' | 'wow' | 'sad' | 'angry';
  user: string;
  post: string;
  comment: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type ResponseReactCommentsType = {
  message: string;
  data: DataReactCommentType[];
};
export type ResponseReactCommentType = {
  message: string;
  data: ReactCommentType;
};
export interface ResponseNumberType {
  message: string;
  number: number;
}
export interface ResponseUserReactType {
  message: string;
  userReact: ReactPostType | ReactCommentType;
}
