import api from './axiosInstance';
import type {LoginRequest, LoginResponse} from './types';

export interface RefreshRequest {
  refreshToken?: string;
  expiresInMins?: number;
}

export interface RefreshResponse {
  accessToken: string;
  refreshToken: string;
}

export const loginRequest = async (data: LoginRequest): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>('/auth/login', data, {
    withCredentials: true,
  });

  return response.data;
};

export const refreshTokenRequest = async (data: RefreshRequest): Promise<RefreshResponse> => {
  const response = await api.post<RefreshResponse>('/auth/refresh', data, {
    withCredentials: true,
  });

  return response.data;
};
