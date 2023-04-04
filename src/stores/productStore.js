import { defineStore } from "pinia";
import apiClient from "src/api";

export const useProductStore = defineStore("ProductStore", {
  state: () => {
    return {
      products: [],
    };
  },
  actions: {
    async fill() {
      this.products = (await apiClient.get("/products")).data;
    },

    async getProductById(id) {
      const res = (await apiClient.get(`/products/${id}`)).data;
      return res.data;
    },
  },
});
