<template>
  <q-page class="constrain row flex-center">
    <div class="q-px-lg bg-white col-6 col-sm-4">
      <h5 class="text-center">Login</h5>

      <q-form
        @submit.prevent.default="loginUser"
        @reset="onReset"
        class="q-gutter-md col-6"
      >
        <q-input outlined v-model="user.email" label="Enter your E-mail" />

        <q-input
          class="q-pb-md"
          v-model="user.password"
          label="Enter your Password"
          :type="isPwd ? 'password' : 'text'"
          outlined
        >
          <template v-slot:append> </template>
        </q-input>

        <div class="q-pb-lg">
          <q-btn
            class="full-width q-py-sm"
            color="primary"
            label="Login"
            type="submit"
            unelevated
          />
        </div>
      </q-form>
    </div>
  </q-page>
</template>

<script>
import { ref } from "vue";
import apiClient from "src/api";
import { useRouter } from "vue-router";
import { useUserStore } from "src/stores/userStore";

export default {
  setup() {
    const userStore = useUserStore();
    const router = useRouter();
    const user = ref({
      email: "",
      password: "",
    });

    const loginUser = async () => {
      await userStore.logIn(user.value.email, user.value.password)
      localStorage.setItem("token", userStore.$state.token)
      router.push('/')
    };

    return {
      user,
      loginUser,
    };
  },
};
// import apiClient from 'src/api'

// export default {
//   data() {
//     return {
//       user: {
//         email: '',
//         password: '',
//       },
//     }
//   },
//   methods: {
//     async loginUser() {
//       const formData = new FormData()
//       formData.append("name", this.user.email)
//       formData.append("password", this.user.password)

//       const res = await apiClient.post("/auth/signin", this.user);
//       localStorage.setItem('token', res.data)
//       this.$router.push('/')

//     },
//   },
// }
</script>
