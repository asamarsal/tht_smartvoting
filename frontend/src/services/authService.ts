import api from './api';
import type { LoginRequest, RegisterRequest, AuthResponse } from '@/utils/types';

// Authentication service - all auth-related API calls
export const authService = {
  /**
   * Login user with email and password
   */
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/login', credentials);
    return response.data;
  },

  /**
   * Register new user
   */
  async register(data: RegisterRequest): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/register', data);
    return response.data;
  },

  /**
   * Logout current user
   */
  async logout(): Promise<void> {
    await api.post('/logout');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
};
