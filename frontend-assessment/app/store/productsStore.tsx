import { create } from "zustand";
import api from "../lib/api";

interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  rating: number;
  thumbnail: string;
}

interface CacheEntry {
  products: Product[];
  total: number;
}

interface ProductsState {
  products: Product[];
  total: number;
  limit: number;
  skip: number;
  loading: boolean;
  search: string;
  category: string;

  cache: Record<string, CacheEntry>;

  fetchProducts: () => Promise<void>;
  searchProducts: (query: string) => Promise<void>;
  filterByCategory: (category: string) => Promise<void>;
  setPage: (skip: number) => Promise<void>;
  resetProducts: () => Promise<void>;
}

export const useProductsStore = create<ProductsState>((set, get) => ({
  products: [],
  total: 0,
  limit: 5,
  skip: 0,
  loading: false,
  search: "",
  category: "",
  cache: {},

  fetchProducts: async () => {
    const { skip, limit, search, category, cache } = get();

    const cacheKey = `list-${skip}-${search}-${category}`;

    // ✅ CACHE HIT
    if (cache[cacheKey]) {
      set({
        products: cache[cacheKey].products,
        total: cache[cacheKey].total,
      });
      return;
    }

    set({ loading: true });

    let url = `/products?limit=${limit}&skip=${skip}`;

    if (search) {
      url = `/products/search?q=${search}`;
    }

    if (category) {
      url = `/products/category/${category}`;
    }

    const res = await api.get(url);

    // ✅ SAVE TO CACHE
    set((state) => ({
      products: res.data.products,
      total: res.data.total,
      loading: false,
      cache: {
        ...state.cache,
        [cacheKey]: {
          products: res.data.products,
          total: res.data.total,
        },
      },
    }));
  },

  searchProducts: async (query) => {
    set({ search: query, category: "", skip: 0 });
    await get().fetchProducts();
  },

  filterByCategory: async (category) => {
    set({ category, search: "", skip: 0 });
    await get().fetchProducts();
  },

  setPage: async (skip) => {
    set({ skip });
    await get().fetchProducts();
  },

  resetProducts: async () => {
  set({
    search: "",
    category: "",
    skip: 0, // 👈 reset pagination to first page
  });

  await get().fetchProducts();
},

}));
