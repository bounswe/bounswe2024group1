import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { fetchGetMe } from "./api/programmingForumComponents";
import { UserProfile } from "./api/programmingForumSchemas";

interface AuthState {
  /* null if logged out */
  token: string | null;
  setToken: (token: string | null) => void;
  fetchProfile: () => void;
  selfProfile: UserProfile | null;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      setToken: (token) => {
        set({ token });
        useAuthStore.getState().fetchProfile();
      },
      fetchProfile: async () => {
        if (!useAuthStore.getState().token) {
          set({ selfProfile: null });
          return;
        }

        fetchGetMe({
          headers: {
            Authorization: `Bearer ${useAuthStore.getState().token}`,
          },
        }).then((profile) => {
          set({ selfProfile: profile.data });
        });
      },
      selfProfile: null,
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useAuthStore;

export const signout = async (): Promise<void> => {
  useAuthStore.getState().setToken(null);
};