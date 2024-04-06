<template>
  <BaseTable
    url="admin/utilities"
    add_label="utility"
    breedcrumb_label="utilities"
    :headers="headers"
    :title="$t('tables.utilities')"
    :form="form"
    :permissions="{
      create: useHelpers().hasPermission('create-propertyUtilities'),
      view: useHelpers().hasPermission('view-propertyUtilities'),
      edit: useHelpers().hasPermission('edit-propertyUtilities'),
      delete: useHelpers().hasPermission('delete-propertyUtilities'),
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
    title: locale("labels.name_en"),
    value: "name_en",
    align: "center",
    sortable: true,
  },
  {
    title: locale("labels.name_ar"),
    value: "name_ar",
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

const form = ref([
  {
    key: "name_en",
    label: locale("labels.en") + locale("labels.name"),
    type: "text",
    required: true,
    placeholder: "electricity",
  },
  {
    key: "name_ar",
    label: locale("labels.name") + locale("labels.ar"),
    type: "text",
    required: true,
    placeholder: "كهرباء",
  },

  {
    key: "is_active",
    label: locale("labels.is_active"),
    type: "switch",
    required: true,
    not_addable: true,
  },
]);
</script>

<style lang="scss" scoped></style>
