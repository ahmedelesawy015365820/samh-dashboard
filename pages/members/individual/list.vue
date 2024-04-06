<template>
  <div>
    <BaseTable
      url="admin/individual-members"
      :headers="headers"
      :title="$t('tables.individual')"
      add_label="individual"
      breedcrumb_label="individual"
      :permissions="{
        create: useHelpers().hasPermission('create-memberships'),
        view: useHelpers().hasPermission('view-memberships'),
        edit: useHelpers().hasPermission('edit-memberships'),
        delete: useHelpers().hasPermission('delete-memberships'),
      }"
    >
    </BaseTable>
  </div>
</template>

 <script setup>
 import { useLangStore } from "../../../stores/lang";

definePageMeta({
  requireAuth: true,
});

const locale = useNuxtApp().$i18n.t;
const headers = ref([
  {
    title: locale("labels.full_name"),
    value: "full_name_member",
    align: "center",
  },
  {
    title: locale("labels.contact_info_member"),
    value: "contact_info_member",
    align: "center",
  },
  {
    title: locale("labels.plan"),
    value: "plan",
    align: "center",
  },
  {
    title: locale("labels.status"),
    value: "memberStatus",
    align: "center",
  },
]);

// const form = ref([
//   {
//     key: useLangStore().current_lang == "en" ? "first_name_en": "first_name_ar",
//     label: locale("labels.first_name"),
//     type: "text",
//     required: false,
//     placeholder: locale("labels.enter") + ' ' + locale("labels.first_name"),
//     col: '6',
//     rules: [useInputRules().required]
//   },
//   {
//     key: useLangStore().current_lang == "en" ? "second_name_en": "second_name_ar",
//     label: locale("labels.second_name"),
//     type: "text",
//     required: false,
//     placeholder: locale("labels.enter") + ' ' + locale("labels.second_name"),
//     col: '6',
//     rules: [useInputRules().required]
//   },
//   {
//     key: useLangStore().current_lang == "en" ? "third_name_en": "third_name_ar",
//     label: locale("labels.third_name"),
//     type: "text",
//     required: false,
//     placeholder: locale("labels.enter") + ' ' + locale("labels.third_name"),
//     col: '6',
//     rules: [useInputRules().required]
//   },
//   {
//     key: useLangStore().current_lang == "en" ? "last_name_en": "last_name_ar",
//     label: locale("labels.last_name"),
//     type: "text",
//     required: false,
//     placeholder: locale("labels.enter") + ' ' + locale("labels.last_name"),
//     col: '6',
//     rules: [useInputRules().required]
//   },
//   {
//     key: "ssn_id",
//     label: locale("labels.ssn_id"),
//     type: "text",
//     required: false,
//     placeholder: locale("labels.enter") + ' ' + locale("labels.ssn_id"),
//     rules: [useInputRules().required,useInputRules().saudi_ids]
//   },
//   {
//     key: "email",
//     label: locale("labels.email"),
//     type: "text",
//     required: false,
//     placeholder: locale("labels.enter") + ' ' + locale("labels.email"),
//     rules: [useInputRules().required,useInputRules().email]
//   },
//   {
//     key: "phone_number",
//     label: locale("labels.phone_number"),
//     type: "text",
//     required: false,
//     placeholder: locale("labels.enter") + ' ' + locale("labels.phone_number"),
//     rules: [useInputRules().required,useInputRules().saudi_numbers]
//   },
//   {
//     key: "roles",
//     label: locale("labels.roles"),
//     type: "select",
//     required: false,
//     getUrl: "admin/roles/dropdown",
//     placeholder: locale("labels.enter") + ' ' + locale("labels.roles"),
//     multiple: true,
//     rules: [useInputRules().required]
//   },
// ]);
</script>

<style lang="scss" scoped></style>
