<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="constrain">
        <q-toolbar-title> Shopping App</q-toolbar-title>

        <q-tabs v-model="tab">
          <q-route-tab label="Products" name="products" to="/#" />

          <!-- <q-route-tab label="Orders" name="orders" to="/orders" /> -->
        </q-tabs>

        <q-separator class="q-ma-md" color="white" vertical />

        <div class="" v-if="showButtons">
          <q-btn
            to="/signup"
            class="q-ma-sm"
            color="white"
            label="Sign-Up"
            outline
            rounded
          />

          <q-btn
            to="/login"
            class="q-ma-sm"
            unelevated
            rounded
            color="white"
            text-color="primary"
            label="Login"
          ></q-btn>
        </div>

        <q-btn
          v-else
          @click="logOut"
          class="q-ma-sm"
          unelevated
          rounded
          color="white"
          text-color="primary"
          label="Logout" git
        ></q-btn>

        <q-btn
          class="q-mx-md"
          to="/orders"
          color="white"
          flat
          icon="shopping_cart"
          round>
          <q-badge color="orange" rounded floating>{{ noCartItems }}</q-badge>
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-footer elevated>
      <q-toolbar>
        <q-toolbar-title>Footer</q-toolbar-title>
      </q-toolbar>
    </q-footer>

    <q-page-container class="bg-grey-1">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref, onMounted, computed, watchEffect } from "vue";
import apiClient from "src/api";
import { useCartStore } from "src/stores/cartStore";
import { useUserStore } from "src/stores/userStore";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "MainLayout",
  setup() {
    const cartStore = useCartStore();
    const userStore = useUserStore();
    const router = useRouter();
    const products = ref([]);
    const noCartItems = ref(0);

    const showButtons = computed(() => {
      return !userStore.$state.token;
    });

    const count = computed(() => cartStore.quantity);

    // const noCartItems = computed(() => {
    //   const sum = 0;
    //   // console.log("Mendem", cartStore.cart)
    //   // for(let item in cartStore.cart){
    //   //   sum += item.quantity
    //   // }
    //   cartStore.cart.forEach((item) => {
    //     sum = sum + 1
    //   })
    //   console.log({sum});
    //   return sum;
    // });

    watchEffect(() => {
      let sum = 0;
      cartStore.cart.forEach((item) => {
        sum += item.quantity;
      });
      noCartItems.value = sum;
    });

    const logOut = () => {
      userStore.logOut();
      localStorage.setItem("token", userStore.$state.token);
      router.push("/login");
    };

    onMounted(async () => {
      await cartStore.getUserCart();
      products.value = await apiClient.get("/products");
    });

    return {
      products,
      showButtons,
      logOut,
      count,
      noCartItems,
    };
  },
});
</script>

<style lang="sass">
.q-toolbar
  height: 70px
</style>
