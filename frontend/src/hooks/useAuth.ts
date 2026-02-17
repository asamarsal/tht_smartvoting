import { useState, useEffect } from 'react';
import { authService } from '@/services/authService';
import type { User, LoginRequest, RegisterRequest } from '@/utils/types';

// Custom hook for authentication state management
export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Initialize auth state from localStorage on mount
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  /**
   * Login user
   */
  const login = async (credentials: LoginRequest) => {
    try {
      const response = await authService.login(credentials);
      
      const { access_token, user } = response.data;
      
      // Store in state
      setToken(access_token);
      setUser(user);
      
      // Store in localStorage
      localStorage.setItem('token', access_token);
      localStorage.setItem('user', JSON.stringify(user));
      
      return { success: true };
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || 'Login failed'
      };
    }
  };

  /**
   * Register new user
   */
  const register = async (data: RegisterRequest) => {
    try {
      const response = await authService.register(data);
      
      const { access_token, user } = response.data;
      
      // Store in state
      setToken(access_token);
      setUser(user);
      
      // Store in localStorage
      localStorage.setItem('token', access_token);
      localStorage.setItem('user', JSON.stringify(user));
      
      return { success: true };
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || 'Registration failed'
      };
    }
  };

  /**
   * Logout user
   */
  const logout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      // Even if API call fails, clear local data
      console.error('Logout API failed:', error);
    } finally {
      // Clear state and localStorage
      setToken(null);
      setUser(null);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  };

  return {
    user,
    token,
    loading,
    isAuthenticated: !!token,
    login,
    register,
    logout,
  };
};
