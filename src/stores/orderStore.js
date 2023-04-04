import { defineStore } from "pinia";
import apiClient from "src/api";

export const useOrderStore = defineStore("OrderStore", {
  state: () => {
    return {
      orders: [],
    };
  },
  actions: {
    async createOrder() {
      const res = (await apiClient.post("/order")).data
      console.log(res)
      return res.data
    }
  },
});
