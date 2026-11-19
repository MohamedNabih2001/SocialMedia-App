import type {
  ResponseGetNotifications,
  ResponseGetNotification,
  ResponseMessage,
} from '../../types/types';
import { api } from './axios';

export async function getNotificationsApi(): Promise<ResponseGetNotifications> {
  const res = await api.get(`/notifications/`);
  return res.data as ResponseGetNotifications;
}

///////////////////////////////////////////////////////

export async function makeNotificationsRead({
  id,
}: {
  id: string;
}): Promise<ResponseGetNotification> {
  const res = await api.put(`/notifications/${id}`);
  return res.data as ResponseGetNotification;
}

///////////////////////////////////////////////////////

export async function deleteNotificationsApi({
  id,
}: {
  id: string;
}): Promise<ResponseMessage> {
  const res = await api.delete(`/notifications/${id}`);
  return res.data as ResponseMessage;
}

///////////////////////////////////////////////////////
