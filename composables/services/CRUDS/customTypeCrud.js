export const useCustomTypeCrudApi = () => {
  return {
    async getTable(url, page, params) {
      const { data, error } = await useMyFetch(
        url +
          `?page=${page || 1}&per_page=10&status=${(params?.status?.id) || ""}
          &type=${params?.type?.id || ""}&type_id=${params?.type_id || ""}&is_mandatory=${params?.is_mandatory?.id || ""}`
      );

      if (useErrorHandler(error.value)) return;

      return data?.value;
    },

    async getShow(url) {
      const { data, error } = await useMyFetch(url);

      if (useErrorHandler(error.value)) return;

      return data?.value?.data;
    },

    async deleteRow(url,body) {
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

  };
};
