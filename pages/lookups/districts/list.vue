<template>
  <BaseTable
      url="admin/districts"
      :headers="headers"
      :title="$t('tables.districts')"
      breedcrumb_label="districts"
      add_label="district"
      :permissions="{
      // create: useHelpers().hasPermission('create-regions'),
      view: useHelpers().hasPermission('view-districts'),
      // edit: useHelpers().hasPermission('edit-regions'),
      delete: useHelpers().hasPermission('delete-districts'),
    }"
  />
</template>

<script setup>
definePageMeta({
  requireAuth: true,
});

const locale = useNuxtApp().$i18n.t;
const headers = ref([
  {
    title: locale("labels.name") + locale("labels.en"),
    value: "name_en",
    align: "center",
  },
  {
    title: locale("labels.name") + locale("labels.ar"),
    value: "name_ar",
    align: "center",
  },
  {
    title: locale("labels.region"),
    value: "region_city",
    align: "center",
  },
  {
    title: locale("labels.city"),
    value: "city.name",
    align: "center",
  },
  {
    title: locale("labels.status"),
    value: "is_active",
    align: "center",
  },
  {
    title: locale("labels.updated_date"),
    value: "updated_at",
    align: "center",
  },
]);
</script>

<style lang="scss" scoped></style>
