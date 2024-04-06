<template>
  <BaseTable
      url="admin/roles"
      :headers="headers"
      :title="$t('tables.roles')"
      :form="form"
      breedcrumb_label="roles"
      add_label="role"
      :permissions="{
      create: useHelpers().hasPermission('create-roles'),
      view: useHelpers().hasPermission('view-roles'),
      edit: useHelpers().hasPermission('edit-roles'),
      delete: useHelpers().hasPermission('delete-roles'),
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
    title: locale("labels.name") + locale("labels.ar"),
    value: "name_ar",
    align: "center",
  },
  {
    title: locale("labels.name") + locale("labels.en"),
    value: "name_en",
    align: "center",
  },
  {
    title: locale("labels.users_count"),
    value: "users_count",
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
    label: locale("labels.name") + locale("labels.en"),
    type: "text",
    required: true,
    placeholder: "manager",
  },
  {
    key: "name_ar",
    label: locale("labels.name") + locale("labels.ar"),
    type: "text",
    required: true,
    placeholder: "مدير",
  },
  {
    key: "guard_name",
    label: locale("labels.guard_name"),
    type: "select",
    required: true,
    placeholder: "نوع الدور",
    staticItems: [
      {id:'api_admin',name: locale("labels.api_admin")},
      {id:'api_member',name: locale("labels.api_member")}
    ],
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
