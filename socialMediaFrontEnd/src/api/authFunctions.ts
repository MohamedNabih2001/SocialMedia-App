import type {
  AuthResponse,
  ResponseGetMe,
  ResponseMessage,
  SignInInput,
} from '../../types/types';
import { api } from './axios';

export async function registerApi(data: FormData): Promise<AuthResponse> {
  const res = await api.post('/users/', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return res.data as AuthResponse;
}

////////////////////////////////////////////
export async function loginApi(data: SignInInput): Promise<AuthResponse> {
  const res = await api.put('/users/', data);
  return res.data as AuthResponse;
}

////////////////////////////////////////////

export async function getMeApi(): Promise<ResponseGetMe> {
  const res = await api.get('/users/me');
  return res.data as ResponseGetMe;
}

////////////////////////////////////////////

export async function updateMeApi({
  data,
  id,
}: {
  data: FormData;
  id: string;
}): Promise<ResponseGetMe> {
  const res = await api.put(`/users/me/${id}`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return res.data as ResponseGetMe;
}

////////////////////////////////////////////
export async function logoutApi(): Promise<ResponseMessage> {
  const res = await api.delete(`/users/`);
  return res.data as ResponseMessage;
}

////////////////////////////////////////////
