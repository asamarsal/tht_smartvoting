import { create } from 'zustand';
import { authService } from '@/services/authService';
import type { User, LoginRequest, RegisterRequest } from '@/utils/types';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  
  initialize: () => void;
  login: (credentials: LoginRequest) => Promise<{ success: boolean; message?: string }>;
  register: (data: RegisterRequest) => Promise<{ success: boolean; message?: string }>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true,

  initialize: () => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (storedToken && storedUser) {
      set({
        token: storedToken,
        user: JSON.parse(storedUser),
        isAuthenticated: true,
        isLoading: false,
      });
    } else {
      set({
        token: null,
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
    }
  },

  login: async (credentials) => {
    set({ isLoading: true });
    try {
      const response = await authService.login(credentials);
      const { access_token, user } = response.data;
      
      localStorage.setItem('token', access_token);
      localStorage.setItem('user', JSON.stringify(user));

      set({
        token: access_token,
        user: user,
        isAuthenticated: true,
        isLoading: false
      });
      
      return { success: true };
    } catch (error: any) {
      set({ isLoading: false });
      return {
        success: false,
        message: error.response?.data?.message || 'Login failed'
      };
    }
  },

  register: async (data) => {
    set({ isLoading: true });
    try {
      const response = await authService.register(data);
      const { access_token, user } = response.data;
      
      localStorage.setItem('token', access_token);
      localStorage.setItem('user', JSON.stringify(user));

      set({
        token: access_token,
        user: user,
        isAuthenticated: true,
        isLoading: false
      });
      
      return { success: true };
    } catch (error: any) {
      set({ isLoading: false });
      return {
        success: false,
        message: error.response?.data?.message || 'Registration failed'
      };
    }
  },

  logout: async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error('Logout API failed:', error);
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      sessionStorage.clear(); // Clear session storage
      set({
        token: null,
        user: null,
        isAuthenticated: false,
        isLoading: false
      });
    }
  },
}));
