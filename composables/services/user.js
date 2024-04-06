import { useLangStore } from "~/stores/lang";

export const userService = () => {
  const langStore = useLangStore();

  return {
    async login(loginData) {
      const { data, error } = await useMyFetch("admin/auth/login", {
        method: "POST",
        body: loginData,
      });

      if (useErrorHandler(error.value)) return;

      const message =
        langStore.current_lang == "en"
          ? "Welcome to Samh RealState Dashboard"
          : "مرحبا بك في لوحة تحكم سمح العقارية";
      useSuccessToas(message);

      return data?.value?.data;
    },

    async logout() {
      const { data, error } = await useMyFetch("admin/auth/logout", {
        method: "POST",
      });

      if (useErrorHandler(error.value)) return;

      const message =
        langStore.current_lang == "en"
          ? "You have been logged out successfully"
          : "تم تسجيل الخروج بنجاح";
      useSuccessToas(message);

      return data.value.data;
    },

    async getUserPermissions() {
      const { data, error } = await useMyFetch("admin/auth/permissions", {
        method: "GET",
      });

      if (useErrorHandler(error.value)) return;

      return data?.value?.data;
    },
  };
};
