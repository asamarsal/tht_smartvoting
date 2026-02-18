import { useEffect } from 'react';
import { useAuthStore } from '@/stores/authStore';

// Custom hook wrapper for backward compatibility with existing components
export const useAuth = () => {
  const authStore = useAuthStore();

  // Initialize auth state from localStorage on first mount
  useEffect(() => {
    // Only initialize if not already done/loading
    if (authStore.isLoading && !authStore.user) {
      authStore.initialize();
    }
  }, []); // Run once on mount

  return {
    user: authStore.user,
    token: authStore.token,
    loading: authStore.isLoading,
    isAuthenticated: authStore.isAuthenticated,
    login: authStore.login,
    register: authStore.register,
    logout: authStore.logout,
  };
};

