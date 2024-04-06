<template>
  <div class="show_type">
    <v-row>

      <v-col :cols="6">
        <CustomTypeTable
            url="admin/usages"
            add_label="usage"
            :headers="headers1"
            :title="$t('tables.usage')"
            :id="id"
            :form="form1"
            :breedcrumb="true"
        />
      </v-col>

      <v-col :cols="6">
        <CustomTypeTable
            url="admin/descriptions"
            add_label="description"
            :headers="headers2"
            :title="$t('tables.descriptions')"
            :id="id"
            :form="form2"
        />
      </v-col>

      <v-col :cols="12">
        <CustomTypeTable
            url="admin/features"
            add_label="feature"
            :headers="headers3"
            :title="$t('tables.features')"
            :id="id"
            :form="form3"
        />
      </v-col>

    </v-row>
  </div>
</template>

<script setup>
const locale = useNuxtApp().$i18n.t;
const type = ref(null);

const headers1 = ref([
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
const form1 = ref([
  {
    key: "usages",
    label: locale("labels.usages"),
    type: "select",
    required: true,
    getUrl: "admin/usages/dropdown",
    multiple: true,
  },
]);

const headers2 = ref([
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
    value: "first_type",
    align: "center",
  },
  {
    title: locale("labels.updated_date"),
    value: "updated_at",
    align: "center",
    sortable: true,
  },
]);
const form2 = ref([
  {
    key: "descriptions",
    label: locale("labels.description"),
    type: "select",
    required: true,
    getUrl: "admin/descriptions/dropdown",
    multiple: true,
  },
  {
    key: "is_mandatory",
    label: '',
    type: "radio",
    required: true,
    options: [
      {label: locale("labels.mandator"), value: 1},
      {label: locale("labels.notmandator"), value: 0}
    ]
  },
]);

const headers3 = ref([
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
const form3 = ref([
  {
    key: "feature",
    label: locale("labels.features"),
    type: "select",
    required: true,
    getUrl: "admin/features/dropdown",
    multiple: true,
  },
]);

const id = useRoute().params.id;

</script>

<style lang="scss" scoped></style>
