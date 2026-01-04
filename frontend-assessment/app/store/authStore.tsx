import { create } from "zustand";
import api from "../lib/api";

interface AuthState {
  user: any | null;
  token: string | null;
  isLoading: boolean;

  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  initAuth: () => Promise<void>;

}

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isLoading: true,
  isLoggingIn: false,

  // Restore auth on app load
  initAuth: async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      set({ user: null, token: null, isLoading: false });
      return;
    }

    try {
      const res = await api.get("/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      set({ user: res.data, token, isLoading: false });
    } catch {
      localStorage.removeItem("token");
      set({ user: null, token: null, isLoading: false });
    }
  },

  login: async (username, password) => {
    try {
      const res = await api.post("/auth/login", {
        username,
        password,
      });

      localStorage.setItem("token", res.data.accessToken);

      set({
        user: res.data,
        token: res.data.accessToken,
      });

      return true;
    } catch {
      return false;
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    set({ user: null, token: null });
  },
}));

export default useAuthStore;
