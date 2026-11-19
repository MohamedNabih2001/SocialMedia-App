import type {
  ResponseAddPostType,
  ResponseGetPosts,
  ResponseGetPostType,
  ResponseMessage,
} from '../../types/types';
import { api } from './axios';

export async function addPostApi(data: FormData): Promise<ResponseAddPostType> {
  const res = await api.post('/posts/', data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return res.data as ResponseAddPostType;
}

/////////////////////////////////////////////////////
export interface InputParamsType {
  page?: number;
  limit: number;
  [key: string]: string | number | boolean | undefined;
}
export async function getPostsApi({
  paramsFilter,
  pageParam,
}: {
  paramsFilter: InputParamsType;
  pageParam?: number;
}): Promise<ResponseGetPosts> {
  const params = { ...paramsFilter, page: pageParam };
  const res = await api.get('/posts/', { params: { ...params } });
  return res.data as ResponseGetPosts;
}

/////////////////////////////////////////////////////

export async function getPostApi({
  postId,
}: {
  postId: string;
}): Promise<ResponseGetPostType> {
  const res = await api.get(`/posts/${postId}`);
  return res.data as ResponseGetPostType;
}

/////////////////////////////////////////////////////

export async function updatePostApi({
  data,
  id,
}: {
  data: FormData;
  id: string;
}): Promise<ResponseAddPostType> {
  console.log(data, id);
  const res = await api.put(`/posts/${id}`, data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return res.data as ResponseAddPostType;
}

/////////////////////////////////////////////////////

export async function deletePostApi({
  id,
}: {
  id: string;
}): Promise<ResponseMessage> {
  const res = await api.delete(`/posts/${id}`);
  return res.data as ResponseMessage;
}

/////////////////////////////////////////////////////

export async function getUserPostsApi({
  userId,
  params,
  pageParam,
}: {
  pageParam?: number;
  params: InputParamsType;
  userId: string | undefined;
}): Promise<ResponseGetPosts | null> {
  if (!userId) return null;
  const usedParams = { ...params, page: pageParam };
  const res = await api.get(`/posts/user/${userId}`, {
    params: { ...usedParams },
  });
  return res.data as ResponseGetPosts;
}

/////////////////////////////////////////////////////
