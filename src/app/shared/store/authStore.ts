'use client';

import {create} from 'zustand';
import type {LoginResponse} from '../api/types';
import {loginRequest, refreshTokenRequest} from '../api/auth';

export interface AuthUser {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  image: string;
}

interface AuthState {
  user: AuthUser | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  hydrateFromStorage: () => void;
  refreshSession: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  hydrateFromStorage: () => {
    if (typeof window === 'undefined') return;

    const storedUser = localStorage.getItem('user');
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    if (storedUser && accessToken) {
      try {
        const parsedUser: AuthUser = JSON.parse(storedUser);
        set({
          user: parsedUser,
          accessToken,
          refreshToken: refreshToken ?? null,
          isAuthenticated: true,
        });
      } catch {
        // ignore
      }
    }
  },

  login: async (username, password) => {
    set({isLoading: true, error: null});

    try {
      const data: LoginResponse = await loginRequest({
        username,
        password,
        expiresInMins: 60,
      });

      const user: AuthUser = {
        id: data.id,
        username: data.username,
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        image: data.image,
      };

      if (typeof window !== 'undefined') {
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);
      }

      set({
        user,
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
    } catch (error: unknown) {
      let message = 'Login failed';

      if (error && typeof error === 'object' && 'response' in error) {
        const err = error as {response?: {data?: {message?: string; error?: string}}};
        message = err.response?.data?.message ?? err.response?.data?.error ?? 'Invalid username or password';
      }

      set({
        isLoading: false,
        error: message,
        isAuthenticated: false,
        accessToken: null,
        refreshToken: null,
        user: null,
      });
    }
  },

  refreshSession: async () => {
    const {refreshToken} = get();
    if (!refreshToken) {
      return;
    }

    try {
      const data = await refreshTokenRequest({
        refreshToken,
        expiresInMins: 60,
      });

      if (typeof window !== 'undefined') {
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);
      }

      set({
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
        isAuthenticated: true,
      });
    } catch {
      get().logout();
    }
  },

  logout: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('user');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    }

    set({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      error: null,
    });
  },
}));
