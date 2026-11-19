import type {
  DataInputReactCommentType,
  ResponseMessage,
  ResponseNumberType,
  ResponseReactCommentsType,
  ResponseReactCommentType,
  ResponseUserReactType,
} from '../../types/types';
import { api } from './axios';

export async function addReactCommentApi(
  data: DataInputReactCommentType
): Promise<ResponseReactCommentType> {
  const res = await api.post('/reactsComments/', data);
  return res.data as ResponseReactCommentType;
}
//////////////////////////
export async function deleteReactCommentApi({
  id,
}: {
  id: string;
}): Promise<ResponseMessage> {
  const res = await api.delete(`/reactsComments/${id}`);
  return res.data as ResponseMessage;
}
//////////////////////////
export async function updateReactCommentApi({
  id,
  type,
}: {
  id: string;
  type: string;
}): Promise<ResponseReactCommentType> {
  const res = await api.put(`/reactsComments/${id}`, { type: type });
  return res.data as ResponseReactCommentType;
}
//////////////////////////
export async function getReactCommentApi({
  id,
}: {
  id: string;
}): Promise<ResponseReactCommentsType> {
  const res = await api.get(`/reactsComments/comment/${id}`);
  return res.data as ResponseReactCommentsType;
}
//////////////////////////
export async function getReactCommentCountApi({
  id,
}: {
  id: string;
}): Promise<ResponseNumberType> {
  const res = await api.get(`/reactsComments/comment/${id}/count`);
  return res.data as ResponseNumberType;
}
//////////////////////////
export async function getIsUserReactCommentApi({
  id,
}: {
  id: string;
}): Promise<ResponseUserReactType> {
  const res = await api.get(`/reactsComments/comment/${id}/user`);
  return res.data as ResponseUserReactType;
}
//////////////////////////
