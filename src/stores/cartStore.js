import { defineStore } from "pinia";
import apiClient from "src/api";

export const useCartStore = defineStore("CartStore", {
  state: () => ({
    cart: [],
  }),
  getters: {
    quantity: (state) => state.cart.length
    // quantity: (state) => {
    //   let totalQuantity = 0;
    //   console.log("Here", state.cart)
    //   state.cart.forEach((item) => {
    //     totalQuantity += item.quantity;
    //   });
    //   return totalQuantity;
    // },
  },
  actions: {
    async addToCart(productId, quantity) {
      await apiClient.post("/cart", { productId, quantity });
    },

    async getUserCart(){
      const res = await apiClient.get("/cart");
      this.$patch({
        cart: res.data
      })
    },

  },
});
