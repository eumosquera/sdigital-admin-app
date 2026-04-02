import { create } from "zustand";
import * as SecureStore from "expo-secure-store";

export const useAuthStore = create((set) => ({
  token: null,
  loading: true,

  loadSession: async () => {
    try {

      const token = await SecureStore.getItemAsync("token");

      set({
        token,
        loading: false,
      });

    } catch (error) {

      set({
        token: null,
        loading: false,
      });

    }
  },

  login: async (token : string) => {
    await SecureStore.setItemAsync("token", token);

    set({
      token,
      loading: false,
    });
  },

  logout: async () => {
    await SecureStore.deleteItemAsync("token");

    set({
      token: null,
      loading: false,
    });
  },
}));