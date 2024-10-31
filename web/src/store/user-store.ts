import { Module } from "vuex";
import api from "@/config/api";

interface UserState {
  token: string | null;
}

const userStore: Module<UserState, any> = {
  namespaced: true,
  state: {
    token: localStorage.getItem("token") || null,
  },
  mutations: {
    SET_TOKEN(state, token: string) {
      state.token = token;
      localStorage.setItem("token", token);
    },
    CLEAR_TOKEN(state) {
      state.token = null;
      localStorage.removeItem("token");
    },
  },
  actions: {
    async login({ commit }, credentials: { email: string; password: string }) {
      try {
        const response = await api.post("/login", credentials);
        commit("SET_TOKEN", response.data.token);
      } catch (error) {
        console.error("Erro de login:", error);
        throw error;
      }
    },
    async register(
      { dispatch },
      credentials: { email: string; password: string }
    ) {
      try {
        await api.post("/register", credentials);
        await dispatch("login", credentials);
      } catch (error) {
        console.error("Erro no registro:", error);
        throw error;
      }
    },
    logout({ commit }) {
      commit("CLEAR_TOKEN");
    },
  },
};

export default userStore;
