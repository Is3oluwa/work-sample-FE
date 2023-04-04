import { defineStore, createStorage } from "pinia";
import apiClient from "src/api";

export const useUserStore = defineStore("UserStore", {
  state: () => ({
    token: localStorage.getItem('token') || "",
  }),
  getters: {
    getToken: (state) => state.token,
  },
  actions: {
    logOut() {
      this.$patch({
        token: "",
      });
    },

    async logIn(email, password) {
      const user = await apiClient.post("/auth/signin", {
        email,
        password,
      });

      console.log("Data", user.data)
      // if(){
      this.$patch({
        token: user.data,
      });
      // }
    },
  },
});
