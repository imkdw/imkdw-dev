import { IMemberDto } from '@imkdw-dev/types';

export interface AuthState {
  user: IMemberDto | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  initializeAuth: () => Promise<void>;
  refreshUser: () => Promise<void>;
  logout: () => void;
}
