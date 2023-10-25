import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  login: (_token: string) => void;
  logout: () => void;
}
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      token: null,
      login: (token: string) => {
        set((state) => ({ ...state, isAuthenticated: true, token }));
      },
      logout: () => {
        set((state) => ({ ...state, token: null, isAuthenticated: false }));
      },
    }),
    {
      name: "auth",
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
