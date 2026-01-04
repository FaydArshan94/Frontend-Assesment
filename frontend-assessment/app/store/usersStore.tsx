import { create } from "zustand";
import api from "../lib/api";

interface UsersState {
  users: any[];
  total: number;
  limit: number;
  skip: number;
  search: string;
  loading: boolean;

  fetchUsers: () => Promise<void>;
  searchUsers: (q: string) => Promise<void>;
  setPage: (page: number) => void;
}

const useUsersStore = create<UsersState>((set, get) => ({
  users: [],
  total: 0,
  limit: 10,
  skip: 0,
  search: "",
  loading: false,

  fetchUsers: async () => {
    const { limit, skip, users } = get();

    // simple cache: avoid refetch if already loaded
    if (users.length > 0) return;

    set({ loading: true });
    try {
      const res = await api.get(`/users?limit=${limit}&skip=${skip}`);
      set({
        users: res.data.users,
        total: res.data.total,
      });
    } finally {
      set({ loading: false });
    }
  },

  searchUsers: async (q: string) => {
    set({ loading: true, search: q, skip: 0 });

    try {
      const res = await api.get(`/users/search?q=${q}`);
      set({
        users: res.data.users,
        total: res.data.total,
      });
    } finally {
      set({ loading: false });
    }
  },

  setPage: async (page: number) => {
    const { limit, search } = get();
    const skip = (page - 1) * limit;

    set({ skip, loading: true });

    try {
      const url = search
        ? `/users/search?q=${search}&limit=${limit}&skip=${skip}`
        : `/users?limit=${limit}&skip=${skip}`;

      const res = await api.get(url);
      set({
        users: res.data.users,
        total: res.data.total,
      });
    } finally {
      set({ loading: false });
    }
  },
}));

export default useUsersStore;
