import type {
  ResponseGetFriends,
  ResponseGetFriendsRequests,
  ResponseGetIsFriend,
  ResponseMessage,
} from '../../types/types';
import { api } from './axios';

////////////////////////////////////////////////

export async function sendFriendRequestApi({
  receiver,
}: {
  receiver: string;
}): Promise<ResponseMessage> {
  const res = await api.post('/friends/', { receiver });
  return res.data as ResponseMessage;
}

////////////////////////////////////////////////

export async function responseFriendRequestApi({
  requestId,
  type,
}: {
  requestId: string;
  type: string;
}): Promise<ResponseMessage> {
  const res = await api.put(`/friends/${requestId}/${type}`);
  return res.data as ResponseMessage;
}

////////////////////////////////////////////////
export async function removeFriendApi({
  friendId,
}: {
  friendId: string;
}): Promise<ResponseMessage> {
  const res = await api.delete(`/friends/${friendId}`);
  return res.data as ResponseMessage;
}

////////////////////////////////////////////////

export async function isFriendApi({
  reciever,
}: {
  reciever: string;
}): Promise<ResponseGetIsFriend> {
  const res = await api.get(`/friends/isFriend/${reciever}`);
  return res.data as ResponseGetIsFriend;
}
////////////////////////////////////////////////

export async function getUserFriendsApi(): Promise<ResponseGetFriends> {
  const res = await api.get(`/friends/`);
  return res.data as ResponseGetFriends;
}
////////////////////////////////////////////////

export async function getUserFriendRequestsApi(): Promise<ResponseGetFriendsRequests> {
  const res = await api.get(`/friends/friendRequests/`);
  return res.data as ResponseGetFriendsRequests;
}
