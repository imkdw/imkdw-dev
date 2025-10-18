import { IMemberDto } from '@imkdw-dev/types';

export interface AuthState {
  member: IMemberDto | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  initializeAuth: () => Promise<void>;
  refreshUser: () => Promise<void>;
  logout: () => void;
}
