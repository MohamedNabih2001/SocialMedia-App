import type {
  ResponeCommentPostType,
  ResponePostCommentsType,
  ResponseMessage,
  ResponseNumberType,
} from '../../types/types';
import { api } from './axios';

export async function getPostCommentsApi({
  id,
}: {
  id: string;
}): Promise<ResponePostCommentsType> {
  const res = await api.get(`/comments/${id}`);
  return res.data as ResponePostCommentsType;
}

///////////////////////////////

export async function getPostCommentsNumberApi({
  id,
}: {
  id: string;
}): Promise<ResponseNumberType> {
  const res = await api.get(`/comments/${id}/count`);
  return res.data as ResponseNumberType;
}

///////////////////////////////

export async function addPostCommentsApi(data: {
  text: string;
  post: string;
  parent?: string;
}): Promise<ResponeCommentPostType> {
  const res = await api.post(`/comments/`, data);
  return res.data as ResponeCommentPostType;
}

///////////////////////////////

export async function updatePostCommentsApi({
  text,
  id,
}: {
  id: string;
  text: string;
}): Promise<ResponeCommentPostType> {
  const res = await api.put(`/comments/${id}`, { text: text });
  return res.data as ResponeCommentPostType;
}

///////////////////////////////

export async function deletePostCommentsApi({
  id,
}: {
  id: string;
}): Promise<ResponseMessage> {
  const res = await api.delete(`/comments/${id}`);
  return res.data as ResponseMessage;
}

///////////////////////////////
