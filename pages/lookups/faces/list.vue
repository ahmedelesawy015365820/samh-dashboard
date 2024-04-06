<template>
  <div>
    <BaseTable
      url="admin/faces"
      :headers="headers"
      :title="$t('tables.faces')"
      :form="form"
      add_label="face"
      breedcrumb_label="faces"
      :permissions="{
        create: useHelpers().hasPermission('create-propertyFace'),
        view: useHelpers().hasPermission('view-propertyFace'),
        edit: useHelpers().hasPermission('edit-propertyFace'),
        delete: useHelpers().hasPermission('delete-propertyFace'),
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
    label: locale("labels.name_en"),
    type: "text",
    required: true,
    placeholder: "cinema",
  },
  {
    key: "name_ar",
    label: locale("labels.name_ar"),
    type: "text",
    required: true,
    placeholder: "سينما",
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
