<template>
  <div class="login">
    <v-form ref="form" class="auth" @submit.prevent="login">
      <header class="header text-center mb-5">
        <h3>{{ $t("auth.login.title") }}</h3>
      </header>

      <main class="inputs">
        <base-input
          type="text"
          v-model="data.user_identifier"
          placeholder="admin"
          :label="$t('labels.username')"
          required
          up_mode
        ></base-input>

        <base-input
          type="password"
          v-model="data.password"
          :label="$t('labels.password')"
          placeholder="************"
          required
          up_mode
        ></base-input>
      </main>

      <footer class="footer mt-5">
        <base-button
          :loading="loading"
          type="submit"
          class="w-100 animate_primary_filled auth"
          >{{ $t("form.login") }}</base-button
        >
      </footer>
    </v-form>
  </div>
</template>

<script setup>
useHead({
  title: useNuxtApp().$i18n.t("pages.login.title"),
});
definePageMeta({
  layout: "auth",
});
import { useAuthStore } from "@/stores/auth";

const loading = ref(false);
const data = ref({
  user_identifier: null,
  password: null,
  rememberMe: false,
});

const form = ref(null);
const login = async () => {
  const { valid } = await form.value.validate();
  if (!valid) return;

  loading.value = true;
  if (await useAuthStore().logIn(data.value)) {
    await navigateTo("/");
  }
  loading.value = false;
};
</script>

<style lang="scss">
.login {
  .rememberMe {
    .v-label {
      text-decoration: underline;
    }
  }

  .forgetPassword {
    a {
      font-size: 15px;
      text-decoration: underline;
      font-weight: 500;
      color: var(--secondary_text_dark) !important;
    }
  }
}
</style>
