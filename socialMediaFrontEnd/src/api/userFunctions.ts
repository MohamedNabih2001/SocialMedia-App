import type { ResponseGetAnyUser } from '../../types/types';
import { api } from './axios';

export async function getAnyUserApi({
  id,
}: {
  id: string;
}): Promise<ResponseGetAnyUser> {
  const res = await api.get(`/users/${id}`);
  return res.data as ResponseGetAnyUser;
}
