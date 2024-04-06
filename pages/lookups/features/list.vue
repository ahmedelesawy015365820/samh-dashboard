<template>
  <BaseTable
    url="admin/features"
    :headers="headers"
    :title="$t('tables.features')"
    :form="form"
    add_label="feature"
    breedcrumb_label="features"
    :permissions="{
      create: useHelpers().hasPermission('create-propertyFeature'),
      view: useHelpers().hasPermission('view-propertyFeature'),
      edit: useHelpers().hasPermission('edit-propertyFeature'),
      delete: useHelpers().hasPermission('delete-propertyFeature'),
    }"
  />
</template>

<script setup>
definePageMeta({
  requireAuth: true,
});

const locale = useNuxtApp().$i18n.t;

import { useGlobalStore } from "@/stores/global";
onMounted(() => {
  useGlobalStore().breedcrumb = {
    items: [
      {
        text: locale("pages.home.title"),
        disabled: false,
        href: "/",
      },
      {
        text: locale("pages.features.title"),
        disabled: true,
        href: "/lookups/features/all",
      },
    ],
    title: locale("pages.features.title"),
  };
});

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
    title: locale("labels.type"),
    value: "type",
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
    placeholder: "pool",
  },
  {
    key: "name_ar",
    label: locale("labels.name") + locale("labels.ar"),
    type: "text",
    required: true,
    placeholder: "حمام سباحة",
  },
  {
    key: "type",
    label: locale("labels.type"),
    type: "select",
    required: true,
    placeholder: "مرافق",
    staticItems: [
      { name: locale("labels.facility"), id: 1 },
      { name: locale("labels.amenity"), id: 2 },
    ],
  },
  {
    key: "types",
    label: locale("labels.property_types"),
    type: "select",
    required: true,
    getUrl: "admin/types",
    multiple: true,
  },
  {
    key: "icon",
    label: locale("labels.icon"),
    type: "text",
    required: true,
    placeholder: "material-symbols-light:filter-b-and-w",
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
