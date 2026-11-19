import type {
  DataInputReactPostType,
  ResponePostReactsType,
  ResponeReactPostType,
  ResponseMessage,
  ResponseNumberType,
  ResponseUserReactType,
} from '../../types/types';
import { api } from './axios';

export async function addPostReactApi(
  data: DataInputReactPostType
): Promise<ResponeReactPostType> {
  const res = await api.post('/reactsPosts/', data);
  return res.data as ResponeReactPostType;
}
//////////////////////////
export async function deletePostReactApi({
  id,
}: {
  id: string;
}): Promise<ResponseMessage> {
  const res = await api.delete(`/reactsPosts/${id}`);
  return res.data as ResponseMessage;
}
//////////////////////////
export async function updatePostReactApi({
  id,
  type,
}: {
  id: string;
  type: string;
}): Promise<ResponeReactPostType> {
  const res = await api.put(`/reactsPosts/${id}`, { type: type });
  return res.data as ResponeReactPostType;
}
//////////////////////////
export async function getPostReactApi({
  id,
}: {
  id: string;
}): Promise<ResponePostReactsType> {
  const res = await api.get(`/reactsPosts/post/${id}`);
  return res.data as ResponePostReactsType;
}
//////////////////////////
export async function getPostReactCountApi({
  id,
}: {
  id: string;
}): Promise<ResponseNumberType> {
  const res = await api.get(`/reactsPosts/post/${id}/count`);
  return res.data as ResponseNumberType;
}
//////////////////////////
export async function getIsUserReactPostApi({
  id,
}: {
  id: string;
}): Promise<ResponseUserReactType> {
  const res = await api.get(`/reactsPosts/post/${id}/user`);
  return res.data as ResponseUserReactType;
}
//////////////////////////
