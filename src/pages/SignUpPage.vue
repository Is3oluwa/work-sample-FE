<template>
  <q-page class="constrain row flex-center">
    <div class="q-px-lg bg-white col-6 col-sm-4">
      <h5 class="text-center">Sign-Up</h5>

      <q-form @submit.prevent="handleSignUp" @reset="onReset" class="q-gutter-md col-6">
        <q-input
          outlined
          v-model="name"
          label="Enter your Name"
          hint="First name and Last name"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Please type something']"
        />

        <q-input
          outlined
          v-model="phoneNo"
          label="Enter your Phone No"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Please type something']"
        />

        <q-input
          outlined
          v-model="email"
          label="Enter your E-mail"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Please type something']"
        />

        <q-input
          class="q-pb-md"
          v-model="password"
          label="Enter your Password"
          :type="isPwd ? 'password' : 'text'"
          outlined
        >
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input>

        <div class="q-pb-lg">
          <q-btn
            class="full-width q-py-sm"
            color="primary"
            label="Sign-Up"
            type="submit"
            unelevated
          />
        </div>
      </q-form>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import apiClient from "src/api";

export default defineComponent({
  name: "SignUpPage",
  data() {
    return {
      token: "",
      name: "",
      phoneNo: "",
      email: "",
      password: "",
    };
  },
  methods: {
    async handleSignUp() {
      const formData = new FormData()
      formData.append("name", this.name)
      formData.append("phoneNo", this.phoneNo)
      formData.append("email", this.email)
      formData.append("password", this.password)

      const res = await apiClient.post("/auth/signup/user", formData);
      this.token = res.data;
    },
  },
});
</script>
