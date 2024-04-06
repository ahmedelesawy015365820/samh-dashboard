<template>
  <v-form class="filter_form" @submit.prevent="submit">
    <!-- <base-input
      v-model="data.keyword"
      :placeholder="$t('placeholders.search')"
      class="table_filter"
      hide-details
      @click:clearable="() => (keyword = '')"
      clearable
    >
      <template #prependInner>
        <span class="me-2"><Icon name="iconamoon:search-thin" /></span>
      </template>
    </base-input> -->

    <select-input
        v-if="add_label != 'description' && add_label != 'feature'"
        @update:modelValue="updateModelVal_status"
        :placeholder="$t('placeholders.status')"
        :static-items="statusOptions"
        hide-details
        class="table_filter select"
        up_mode
    />

    <select-input
        v-if="add_label == 'feature'"
        @update:modelValue="updateModelVal_type"
        :placeholder="$t('labels.type')"
        :static-items="typeOptions"
        hide-details
        class="table_filter select"
        up_mode
    />

    <select-input
        v-if="add_label == 'description'"
        @update:modelValue="updateModelVal_mandatory"
        :placeholder="$t('labels.type')"
        :static-items="mandatoryOptions"
        hide-details
        class="table_filter select"
        up_mode
    />

  </v-form>
</template>

<script setup>
const emit = defineEmits(["table_filtered"]);

const props = defineProps({
  permissions: {
    required: true,
    type: Object,
  },
  path: {
    required: false,
    type: String,
  },
  add_label: {
    required: true,
    type: String,
  },
});

const locale = useNuxtApp().$i18n.t;

const statusOptions = ref([
  { id: "", name: locale("labels.all") },
  { id: "1", name: locale("labels.active") },
  { id: "0", name: locale("labels.in_active") },
]);

const typeOptions = ref([
  { id: "", name: locale("labels.all") },
  { id: "1", name: locale("labels.facility") },
  { id: "2", name: locale("labels.amenity") },
]);

const mandatoryOptions = ref([
  { id: "", name: locale("labels.all") },
  { id: "1", name: locale("labels.mandator") },
  { id: "0", name: locale("labels.notmandator") },
]);

const updateModelVal_status = (val) => {
  data.value.status = val;
};

const updateModelVal_type = (val) => {
  data.value.type = val;
};

const updateModelVal_role = (val) => {
  data.value.role_id = val;
};

const updateModelVal_mandatory = (val) => {
  data.value.is_mandatory = val;
};

const data = ref({
  status: "",
  type: "",
  role_id: "",
  is_mandatory: ""
});

const submit = () => {
  emit("table_filtered", data.value);
};

watch(
  data,
  () => {
    emit("table_filtered", data.value);
  },
  { deep: true }
);
</script>

<style lang="scss" scoped>
form.filter_form {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 15px;

  .table_filter.select {
    min-width: 140px;
  }
}
</style>
