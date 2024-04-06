<template>
  <v-form class="filter_form" @submit.prevent="submit">
    <base-input
      v-model="data.keyword"
      :placeholder="$t('placeholders.search')"
      class="table_filter _search"
      hide-details
      @click:clearable="() => (keyword = '')"
      clearable
    >
      <template #prependInner>
        <span class="me-2"><Icon name="iconamoon:search-thin" /></span>
      </template>
    </base-input>
    <select-input
        v-if="add_label == 'city'"
        @update:modelValue="updateModelVal_type"
        :placeholder="$t('placeholders.type')"
        :static-items="cityTypeOptions"
        hide-details
        class="table_filter select"
        up_mode
    />

    <select-input
        v-if="add_label == 'district'"
        @update:modelValue="updateModelVal_city"
        :placeholder="$t('labels.city')"
        crud
        getUrl="admin/cities/dropdown"
        hide-details
        class="table_filter select"
        up_mode
    />

    <select-input
        v-if="add_label == 'city' || add_label == 'district'"
        @update:modelValue="updateModelVal_region"
        :placeholder="$t('labels.region')"
        crud
        getUrl="admin/regions/dropdown"
        hide-details
        class="table_filter select"
        up_mode
    />

    <select-input
      v-if="add_label == 'feature'"
      @update:modelValue="updateModelVal_type"
      :placeholder="$t('labels.type')"
      crud
      getUrl="admin/types"
      hide-details
      class="table_filter select"
      up_mode
    />

    <select-input
      v-if="add_label == 'employee'"
      @update:modelValue="updateModelVal_role"
      :placeholder="$t('labels.role')"
      crud
      getUrl="admin/roles/dropdown"
      hide-details
      class="table_filter select"
      up_mode
    />
    <select-input
        v-if="url == 'admin/individual-members'"
        @update:modelValue="updateModelVal_plan"
        :placeholder="$t('labels.plan')"
        crud
        getUrl="admin/plans/dropdown"
        hide-details
        class="table_filter select"
        up_mode
    />

    <select-input
        v-if="add_label == 'employee'|| add_label == 'individual' || add_label == 'company'"
        @update:modelValue="updateModelVal_status"
        :placeholder="$t('placeholders.status')"
        :static-items="employeeStatusOptions"
        hide-details
        class="table_filter select"
        up_mode
    />

    <select-input
        v-if="!(add_label == 'employee'|| add_label == 'individual' || add_label == 'company')"
        @update:modelValue="updateModelVal_status"
        :placeholder="$t('placeholders.status')"
        :static-items="statusOptions"
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
  url: {
    required: false,
    type: String,
  },
});

const locale = useNuxtApp().$i18n.t;

const statusOptions = ref([
  { id: "", name: locale("labels.all") },
  { id: "1", name: locale("labels.active") },
  { id: "0", name: locale("labels.in_active") },
]);

const employeeStatusOptions = ref([
  { id: "", name: locale("labels.all") },
  { id: "1", name: locale("labels.active") },
  { id: "0", name: locale("labels.pending") },
  { id: "2", name: locale("labels.blocked") },
]);

const cityTypeOptions = ref([
  { id: "", name: locale("labels.all") },
  { id: "1", name: locale("labels.city") },
  { id: "2", name: locale("labels.village") },
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

const updateModelVal_plan = (val) => {
  data.value.plan_id = val;
};

const updateModelVal_region = (val) => {
  data.value.region_id = val;
};

const updateModelVal_city = (val) => {
  data.value.city_id = val;
};

const data = ref({
  status: "",
  type: "",
  role_id: "",
  region_id: "",
  city_id: "",
  plan_id: ""
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
  //justify-content: flex-end;
  gap: 15px;

  .table_filter.select {
    min-width: 140px;
  }

  .table_filter._search {
    flex-grow: 1;
  }
}
</style>
