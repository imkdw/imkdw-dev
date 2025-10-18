import { create } from 'zustand';
import { getCurrentMember } from '@imkdw-dev/actions';
import type { AuthState } from './auth.type';

export const useAuthStore = create<AuthState>(set => ({
  member: null,
  isLoading: true,
  isAuthenticated: false,
  initializeAuth: async () => {
    set({ isLoading: true });
    try {
      const member = await getCurrentMember();
      set({
        member,
        isAuthenticated: !!member,
        isLoading: false,
      });
    } catch {
      set({
        member: null,
        isAuthenticated: false,
        isLoading: false,
      });
    }
  },
  refreshUser: async () => {
    set({ isLoading: true });
    try {
      const member = await getCurrentMember();
      set({
        member,
        isAuthenticated: !!member,
        isLoading: false,
      });
    } catch {
      set({
        member: null,
        isAuthenticated: false,
        isLoading: false,
      });
    }
  },
  logout: () => {
    set({
      member: null,
      isAuthenticated: false,
      isLoading: false,
    });
  },
}));
