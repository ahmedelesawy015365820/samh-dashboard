export const permissionsService = () => {
  const langStore = useLangStore();

  return {
    async getRolesAndPermissions() {
      const { data, error } = await useMyFetch("admin/permissions", {
        method: "GET",
      });

      if (useErrorHandler(error.value)) return;

      return data?.value?.data;
    },

    async getPermissionsToRole(role_id) {
      const { data, error } = await useMyFetch(
        `admin/permissions/edit?role_id=${role_id}`,
        {
          method: "GET",
        }
      );

      if (useErrorHandler(error.value)) return;

      return data?.value?.data;
    },

    async updateRolePermissions(body_data) {
      const { data, error } = await useMyFetch("admin/permissions", {
        method: "POST",
        body: body_data,
      });

      if (useErrorHandler(error.value)) return;

      const message =
        langStore.current_lang == "en"
          ? "Permissions has been updated"
          : "تم تحديث الصلاحيات";
      useSuccessToas(message);

      return data?.value?.data;
    },
  };
};
