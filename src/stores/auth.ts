import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface AuthState {
  isAuthenticated: boolean;
  nombre: string | null;
  apellido: string | null;
  rol: string | null;
  email: string | null;
  tokens: {
    refresh: string;
    access: string;
  } | null;
  login: (userData: any) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      username: null,
      email: null,
      tokens: null,
      login: (userData: any) => {
        set((state) => ({
          ...state,
          isAuthenticated: true,
          nombre: userData.nombre,
          apellido: userData.apellido,
          rol: userData.rol,
          email: userData.email,
          tokens: {
            refresh: userData.tokens.refresh,
            access: userData.tokens.access,
          },
        }));
      },
      logout: () => {
        console.log("sfaa");
        set((state) => ({
          ...state,
          nombre: null,
          apellido: null,
          rol: null,
          email: null,
          tokens: null,
          isAuthenticated: false,
        }));
      },
    }),
    {
      name: "auth",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
