<template>
  <q-page class="column flex flex-center">
    <q-card
      v-for="product in productsInCart"
      class="my-card q-ma-xs"
      style="min-width: 500px"
    >
      <q-card-section horizontal class="flex">
        <!-- <div style="width: 200px; aspect-ratio: 1/1; background: red;"> -->

        <q-img
          :src="product.image"
          :ratio="1"
          fit="fill"
          width="150px"
          height="150px"
        />
        <!-- </div> -->

        <q-card-section vertical class="flex justify-around">
          <div class="text-h6 full-width q-ma-xs">{{ product.name }}</div>
          <div class="text-subtitle1 full-width q-ma-xs">
            <strong>PRICE</strong>: {{ product.price }}
          </div>
          <div class="text-subtitle1 full-width q-ma-xs">
            <strong>QUANTITY</strong>: {{ product.quantity }}
          </div>
          <!-- <q-btn
            color="primary"
            dense
            class="q-px-md q-mt-md"
            size="SM"
            label="remove from cart"
          /> -->
        </q-card-section>
      </q-card-section>
    </q-card>

    <q-btn
      @click="placeOrder()"
      color="primary"
      class="q-ma-md q-px-lg flex"
      style="min-width: 500px"
      label="Place your order"
    />

    <q-dialog v-model="confirm" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="info" color="primary" text-color="white" />
          <span class="q-ml-sm">Your Order has been placed</span>
        </q-card-section>
        <q-card-section>
          <p>Please check your email for more details</p>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Ok" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { useCartStore } from "src/stores/cartStore";
import { useProductStore } from "src/stores/productStore";
import { useUserStore } from "src/stores/userStore";
import { useOrderStore } from "src/stores/orderStore";
import { computed, onMounted, ref } from "vue";

const cartStore = useCartStore();
const productStore = useProductStore();
const userStore = useCartStore();
const Cart = cartStore.$state.cart;
const orderStore = useOrderStore();

const confirm = ref(false);

const placeOrder = async () => {
  await orderStore.createOrder();
  await cartStore.getUserCart();
  confirm.value = true;
};

onMounted(async () => {
  const res = await productStore.getProductById(8);
  console.log(res);
});

const productsInCart = computed(() => {
  return cartStore.$state.cart.map((item) => ({
    image: item.product.image,
    name: item.product.name,
    price: `$${item.product.price}`,
    quantity: item.quantity,
  }));
});
</script>
