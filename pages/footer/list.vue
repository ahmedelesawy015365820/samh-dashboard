<template>
  <div>
    <BaseTable
      url="admin/footer"
      :headers="headers"
      :tableTitle="$t('tables.header')"
      path="footer"
      :permissions="{
        create: useHelpers().hasPermission('create-footer'),
        view: useHelpers().hasPermission('view-footer'),
        edit: useHelpers().hasPermission('edit-footer'),
        delete: useHelpers().hasPermission('delete-footer'),
      }"
    >
    </BaseTable>
  </div>
</template>

<script setup>
definePageMeta({
  requireAuth: true,
});

const locale = useNuxtApp().$i18n.t;
const headers = ref([
  {
    title: locale("labels.image"),
    value: "logo_url",
    align: "center",
  },
  {
    title: locale("labels.is_active"),
    value: "is_active",
    align: "center",
  },
  { title: "تاريخ الانشاء", value: "created_at", align: "center" },
  { title: "تاريخ التعديل", value: "updated_at", align: "center" },
]);
</script>

<style lang="scss" scoped></style>
