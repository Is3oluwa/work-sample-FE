<template>
  <q-page class="constrain q-pa-md row flex flex-center">
    <q-card
      v-for="product in productStore.products"
      class="my-card q-ma-xs col-6 col-md-3 col-sm-6"
    >
      <q-img :src="product.image" />

      <q-card-section>
        <div class="row no-wrap items-center text-h6 ellipsis">
          {{ product.name }}
        </div>
        <div class="text-subtitle1">${{ product.price }}</div>
        <div class="text-caption text-grey ellipsis">
          {{ product.description }}
        </div>
      </q-card-section>

      <q-separator />

      <q-card-actions class="">
        <div class="row flex no-wrap q-py-xs">
          <div class="col">
            <q-input
              v-model.number="product.quantity"
              type="number"
              filled
              dense
              class="q-mr-sm"
              style=""
            />
          </div>
          <q-btn
            @click="AddToCart(product)"
            class=""
            :disable = "product.quantity < 1"
            color="primary"
            dense
            label="Add to Cart"
            size="md"
          />
        </div>
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script setup>
import { useCartStore } from "src/stores/cartStore";
import { useProductStore } from "src/stores/productStore";
import { useUserStore } from "src/stores/userStore";
import { computed, onMounted } from "vue";

const productStore = useProductStore();

const userStore = useUserStore();

const cartStore = useCartStore();

const token = computed(() => {
  console.log(userStore.token);
  return userStore.token;
});
const AddToCart = async (product) => {
  await cartStore.addToCart(product.id, product.quantity);
  await cartStore.getUserCart();
};

productStore.fill();
</script>

<style lang="sass">
.q-card
  max-height: 380px
  max-width: 288px
.q-card-actions
  height: 48px
.q-img
  width: 100%
  height: 200px
</style>
