import { create } from "zustand";
import { createJSONStorage } from "zustand/middleware";
import { persist } from "zustand/middleware";

interface AuthState {
  /* null if logged out */
  token: string | null;
  setToken: (token: string | null) => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      setToken: (token) => set({ token }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useAuthStore;

export const signout = async (): Promise<void> => {
  useAuthStore.getState().setToken(null);
};
