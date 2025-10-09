import { create } from 'zustand';
import { getCurrentMember } from '@imkdw-dev/actions';
import type { AuthState } from './auth.type';

export const useAuthStore = create<AuthState>(set => ({
  user: null,
  isLoading: true,
  isAuthenticated: false,
  initializeAuth: async () => {
    set({ isLoading: true });
    try {
      const user = await getCurrentMember();
      set({
        user,
        isAuthenticated: !!user,
        isLoading: false,
      });
    } catch {
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
    }
  },
  refreshUser: async () => {
    set({ isLoading: true });
    try {
      const user = await getCurrentMember();
      set({
        user,
        isAuthenticated: !!user,
        isLoading: false,
      });
    } catch {
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
    }
  },
  logout: () => {
    set({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });
  },
}));
