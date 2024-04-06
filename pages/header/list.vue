<template>
  <div>
    <BaseTable
      url="admin/header"
      :headers="headers"
      :tableTitle="$t('tables.header')"
      showExpand
      :form="form"
      :permissions="{
        create: useHelpers().hasPermission('create-header'),
        view: useHelpers().hasPermission('view-header'),
        edit: useHelpers().hasPermission('edit-header'),
        delete: useHelpers().hasPermission('delete-header'),
      }"
    >
      <template #expand="{ item, columns }">
        <tr>
          <td :colspan="columns.length" class="py-5">
            <v-row>
              <v-col cols="12" md="4">
                <div class="expand_show_item">
                  <h5 class="label">
                    {{ $t("labels.paragraph") + $t("labels.en") }}
                  </h5>
                  <p class="value para">{{ item.paragraph_en }}</p>
                </div>
              </v-col>
              <v-col cols="12" md="4">
                <div class="expand_show_item">
                  <h5 class="label">
                    {{ $t("labels.paragraph") + $t("labels.ar") }}
                  </h5>
                  <p class="value para">{{ item.paragraph_ar }}</p>
                </div>
              </v-col>
            </v-row>
          </td>
        </tr>
      </template>
    </BaseTable>
  </div>
</template>

<script setup>
definePageMeta({
  requireAuth: true,
});

const locale = useNuxtApp().$i18n.t;
const headers = ref([
  {
    title: locale("labels.image"),
    value: "image_url",
    align: "center",
  },
  {
    title: locale("labels.title") + " 1 " + locale("labels.ar"),
    value: "title_1_ar",
    align: "center",
  },
  {
    title: locale("labels.title") + " 2 " + locale("labels.ar"),
    value: "title_2_ar",
    align: "center",
  },
  {
    title: locale("labels.title") + " 1 " + locale("labels.en"),
    value: "title_1_en",
    align: "center",
  },
  {
    title: locale("labels.title") + " 2 " + locale("labels.en"),
    value: "title_2_en",
    align: "center",
  },
  {
    title: locale("labels.is_active"),
    value: "is_active",
    align: "center",
  },
  { title: "تاريخ الانشاء", value: "created_at", align: "center" },
  { title: "تاريخ التعديل", value: "updated_at", align: "center" },
]);

const form = ref([
  {
    key: "image_url",
    label: locale("labels.image"),
    type: "image",
    required: true,
  },
  {
    key: "title_1_ar",
    label: locale("labels.title") + " 1 " + locale("labels.ar"),
    type: "text",
    required: true,
    placeholder: "افضل طريقة للبحث عن بيتك",
  },
  {
    key: "title_2_ar",
    label: locale("labels.title") + " 2 " + locale("labels.ar"),
    type: "text",
    required: true,
    placeholder: "افضل طريقة للبحث عن بيتك",
  },
  {
    key: "title_1_en",
    label: locale("labels.title") + " 1 " + locale("labels.en"),
    type: "text",
    required: true,
    placeholder: "best way to find your dreem home",
  },
  {
    key: "title_2_en",
    label: locale("labels.title") + " 2 " + locale("labels.en"),
    type: "text",
    required: true,
    placeholder: "best way to find your home",
  },
  {
    key: "paragraph_ar",
    label: locale("labels.paragraph") + locale("labels.ar"),
    type: "text",
    required: true,
    placeholder: "لدينا أكثر من 745,000 شقة، مكان، وقطعة أرض.",
  },
  {
    key: "paragraph_en",
    label: locale("labels.paragraph") + locale("labels.en"),
    type: "text",
    required: true,
    placeholder: "We have more than 745,000 apartments, places, and plots.",
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
