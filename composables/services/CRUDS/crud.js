export const useCrudApi = () => {
  return {
    async getTable(url, page, params) {
      const { data, error } = await useMyFetch(
        url +
          `?page=${page || 1}&per_page=10&keyword=${
            params?.keyword || ""
          }&status=${(params?.status?.id) || ""}&type=${params?.type?.id || ""}&role_id=${params?.role_id?.id || ""}
          &region_id=${params?.region_id?.id || ""}&city_id=${params?.city_id?.id || ""}&city_id=${params?.plan_id?.id || ""}`
      );

      if (useErrorHandler(error.value)) return;

      return data?.value;
    },

    async deleteRow(url) {
      const { data, error } = await useMyFetch(url, {
        method: "DELETE",
      });

      if (useErrorHandler(error.value)) return;

      const message =
        useHelpers().lang() == "ar"
          ? "تم حذف البيانات بنجاح"
          : "Data deleted successfully";
      useSuccessToas(message);

      return data?.value?.data;
    },

    async editRow(url, body) {
      const { data, error } = await useMyFetch(url, {
        method: "POST",
        body,
      });

      if (useErrorHandler(error.value)) return;

      const message =
        useHelpers().lang() == "ar"
          ? "تم تعديل البيانات بنجاح"
          : "Data edited successfully";
      useSuccessToas(message);

      return data?.value?.data;
    },

    async addRow(url, body) {
      const { data, error } = await useMyFetch(url, {
        method: "POST",
        body,
      });

      if (useErrorHandler(error.value)) return;

      const message =
        useHelpers().lang() == "ar"
          ? "تم اضافة البيانات بنجاح"
          : "Data added successfully";
      useSuccessToas(message);

      return data?.value?.data;
    },

    async bulkDeleteRow(url, body) {
      const { data, error } = await useMyFetch(url, {
        method: "POST",
        body,
      });

      if (useErrorHandler(error.value)) return;

      const message =
        useHelpers().lang() == "ar"
          ? "تم حذف البيانات بنجاح"
          : "Data deleted successfully";
      useSuccessToas(message);

      return data?.value?.data;
    },

    async bulkStatusRow(url, body) {
      const { data, error } = await useMyFetch(url, {
        method: "POST",
        body,
      });

      if (useErrorHandler(error.value)) return;

      const message =
          useHelpers().lang() == "ar"
              ? "تم تعديل البيانات بنجاح"
              : "Data updated successfully";
      useSuccessToas(message);

      return data?.value?.data;
    },
  };
};
