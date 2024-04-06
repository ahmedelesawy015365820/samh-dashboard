<template>
  <div>
    <BaseTable
      url="admin/types"
      add_label="type"
      breedcrumb_label="types"
      :headers="headers"
      :title="$t('tables.types')"
      :form="form"
      :permissions="{
        create: useHelpers().hasPermission('create-propertyType'),
        view: useHelpers().hasPermission('view-propertyType'),
        edit: useHelpers().hasPermission('edit-propertyType'),
        delete: useHelpers().hasPermission('delete-propertyType'),
      }"
    />
  </div>
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
    sortable: true,
  },
]);

const form = ref([
  {
    key: "name_en",
    label: locale("labels.en") + locale("labels.name"),
    type: "text",
    required: true,
    placeholder: "cinema",
  },
  {
    key: "name_ar",
    label: locale("labels.name") + locale("labels.ar"),
    type: "text",
    required: true,
    placeholder: "سينما",
  },

  {
    key: "usages",
    label: locale("labels.usages"),
    type: "select",
    required: true,
    getUrl: "admin/usages",
    multiple: true,
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
