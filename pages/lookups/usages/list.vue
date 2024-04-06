<template>
  <div>
    <BaseTable
      url="admin/usages"
      :headers="headers"
      :title="$t('tables.usage')"
      add_label="usage"
      breedcrumb_label="usages"
      :form="form"
      :permissions="{
        create: useHelpers().hasPermission('create-propertyUsage'),
        view: useHelpers().hasPermission('view-propertyUsage'),
        edit: useHelpers().hasPermission('edit-propertyUsage'),
        delete: useHelpers().hasPermission('delete-propertyUsage'),
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
  },
]);

const form = ref([
  {
    key: "name_en",
    label: locale("labels.en") + locale("labels.name"),
    type: "text",
    required: true,
    placeholder: "Agricultural",
  },
  {
    key: "name_ar",
    label: locale("labels.name") + locale("labels.ar"),
    type: "text",
    required: true,
    placeholder: "زراعي",
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
