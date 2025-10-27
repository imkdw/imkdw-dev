import { create } from 'zustand';
import { IMemberDto } from '@imkdw-dev/types';

export interface AuthState {
  member: IMemberDto | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  setMember: (member: IMemberDto | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>(set => ({
  member: null,
  isLoading: true,
  isAuthenticated: false,
  setMember: (member: IMemberDto | null) =>
    set({
      member,
      isAuthenticated: member !== null,
      isLoading: false,
    }),
  logout: () => {
    set({
      member: null,
      isAuthenticated: false,
      isLoading: false,
    });
  },
}));
