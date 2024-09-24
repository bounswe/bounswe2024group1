/* eslint-disable prettier/prettier */
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
const BASE_URL = "https://semantic-cuisine-staging-t3m52.ondigitalocean.app";

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

interface UserLogin {
  usernameOrEmail?: string;
  password?: string;
}
/*
 * Returns token if successful
 * Throws an error if unsuccessful
 */
export const signin = async (login: UserLogin): Promise<void> => {
  return fetch(BASE_URL + "/api/v1/users/login", {
    method: "POST",
    body: JSON.stringify(login),
    headers: { "Content-Type": "application/json" },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.status !== 200) {
        throw new Error(data.message);
      }
      useAuthStore.getState().setToken(data.data.token);
    })
    .catch((error: Error) => {
      if (error.message) {
        throw new Error(error.message);
      }
      throw new Error("Unknown error");
    });
};

export const signout = async (): Promise<void> => {
  useAuthStore.getState().setToken(null);
};

interface SignupRequest {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  country: string;
}

export const signup = async (signup: SignupRequest): Promise<void> => {
  return fetch(BASE_URL + "/api/v1/users/signup", {
    method: "POST",
    body: JSON.stringify(signup),
    headers: { "Content-Type": "application/json" },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.status !== 200) {
        throw new Error(data.message);
      }
      useAuthStore.getState().setToken(data.data.token);
    })
    .catch((error: Error) => {
      if (error.message) {
        throw new Error(error.message);
      }
      throw new Error("Unknown error");
    });
};
