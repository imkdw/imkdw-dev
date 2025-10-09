import { useAuthStore } from './auth.store';

export function useAuth() {
  return useAuthStore();
}
