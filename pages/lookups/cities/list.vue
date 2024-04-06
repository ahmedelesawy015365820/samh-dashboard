<template>
  <BaseTable
      url="admin/cities"
      :headers="headers"
      :title="$t('tables.cities')"
      breedcrumb_label="cities"
      add_label="city"
      :permissions="{
      // create: useHelpers().hasPermission('create-regions'),
      view: useHelpers().hasPermission('view-cities'),
      // edit: useHelpers().hasPermission('edit-regions'),
      delete: useHelpers().hasPermission('delete-cities'),
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
    value: "region.name",
    align: "center",
  },
  {
    title: locale("labels.type"),
    value: "type_city",
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
