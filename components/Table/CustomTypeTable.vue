<template>
  <div class="baseTable">
    <v-data-table
      color="primary"
      hide-default-footer
      v-bind:="$attrs"
      :items-per-page="itemsPerPage"
      :loading="table_loading"
      v-model="selected"
      v-model:expanded="expanded"
      :page="page"
      :headers="_headers"
      :items="rows"
      return-object
      item-key="id"
      item-value="id"
      show-select
      item-selectable="selectable"
      select-strategy="page"
      :show-expand="showExpand"
      :hover="true"
    >
      <!-- ==================== Headers -->
      <template
        v-slot:header.price="{ column, sortBy, someSelected, allSelected }"
      >
        <div class="sort_header d-flex align-center ga-1">
          <div class="title">{{ column.title }}</div>
          <div
            class="sort_arrows d-flex flex-column justify-center align-center"
          >
            <Icon
              class="up"
              size="20"
              name="ic:baseline-arrow-drop-up"
              :class="{
                active: sortBy[0]?.key == 'price' && sortBy[0]?.order == 'asc',
              }"
            />
            <Icon
              size="20"
              name="ic:baseline-arrow-drop-down"
              class="down"
              :class="{
                active: sortBy[0]?.key == 'price' && sortBy[0]?.order == 'desc',
              }"
            />
          </div>
        </div>
      </template>
      <template
        v-slot:header.views_num="{ column, sortBy, someSelected, allSelected }"
      >
        <div class="sort_header d-flex align-center ga-1">
          <div class="title">{{ column.title }}</div>
          <div
            class="sort_arrows d-flex flex-column justify-center align-center"
          >
            <Icon
              class="up"
              size="20"
              name="ic:baseline-arrow-drop-up"
              :class="{
                active:
                  sortBy[0]?.key == 'views_num' && sortBy[0]?.order == 'asc',
              }"
            />
            <Icon
              size="20"
              name="ic:baseline-arrow-drop-down"
              class="down"
              :class="{
                active:
                  sortBy[0]?.key == 'views_num' && sortBy[0]?.order == 'desc',
              }"
            />
          </div>
        </div>
      </template>
      <template
        v-slot:header.name_en="{ column, sortBy, someSelected, allSelected }"
      >
        <div class="sort_header d-flex align-center ga-1">
          <div class="title">{{ column.title }}</div>
          <div
            class="sort_arrows d-flex flex-column justify-center align-center"
          >
            <Icon
              class="up"
              size="20"
              name="ic:baseline-arrow-drop-up"
              :class="{
                active:
                  sortBy[0]?.key == 'name_en' && sortBy[0]?.order == 'asc',
              }"
            />
            <Icon
              size="20"
              name="ic:baseline-arrow-drop-down"
              class="down"
              :class="{
                active:
                  sortBy[0]?.key == 'name_en' && sortBy[0]?.order == 'desc',
              }"
            />
          </div>
        </div>
      </template>

      <!-- ==================== Items -->
      <template v-slot:item.name_ar="{ item }">
        <span>{{ item.name_ar }}</span>
      </template>
      <template v-slot:item.name_en="{ item }">
        <span>{{ item.name_en }}</span>
      </template>

      <template v-slot:item.status="{ item }">
        <v-chip label :color="useHelpers().getStatus(item.status).color">{{
          useHelpers().getStatus(item.status).text
        }}</v-chip>
      </template>

      <template v-slot:item.created_at="{ item }">
        <span>{{ useHelpers().formatDate(item.created_at) }}</span>
      </template>
      <template v-slot:item.updated_at="{ item }">
        <span>{{ useHelpers().formatDate(item.updated_at) }}</span>
      </template>

      <template v-slot:item.type="{ item }">
          <span class="content">{{
              item.type == 1 ? $t("labels.facility") : $t("labels.amenity")
            }}</span>
      </template>

      <template v-slot:item.first_type="{ item }">
        <div v-if="item.first_type">
          {{ item.first_type.is_mandatory == 1 ? $t("labels.mandator") : $t("labels.notmandator") }}
        </div>
      </template>

      <template v-slot:item.is_active="{ item }">
        <v-chip
          class="status"
          :color="item.is_active ? '#34D399' : '#EF4444'"
          :text="item.is_active ? $t('labels.active') : $t('labels.in_active')"
          label
        ></v-chip>
      </template>
      <!-- Top -->
      <template v-slot:top>
        <header class="header d-flex align-center">
          <h2 class="mb-0 me-5 me-lg-16">{{ title }}</h2>

          <div class="filter flex-grow-1 me-4">
            <CustomTypeTableFilter
              :add_label="add_label"
              :path="path"
              @table_filtered="filter_table"
            />
          </div>

          <div class="btns">
            <base-button
              v-if="!path"
              @click="addItem"
              class="animate_primary_filled"
            >
              <Icon name="ic:outline-add" />
              {{
                $t("form.attach") + " " + $t(`labels.${add_label.toLowerCase()}`)
              }}
            </base-button>
          </div>
        </header>
      </template>

      <!-- Actions -->
      <template v-slot:item.actions="{ item }">
        <div class="actions">
          <v-menu class="table_actions" location="bottom">
            <template v-slot:activator="{ props }">
              <span class="filter_icon">
                <Icon
                  color="primary"
                  size="23"
                  name="mage:filter-fill"
                  v-bind="props"
                ></Icon
              ></span>
            </template>
            <ul class="list">
              <!-- Delete -->
              <li class="delete" v-ripple>
                <span @click="deleteItem(item)">
                  <Icon
                    size="25"
                    name="solar:trash-bin-minimalistic-2-bold-duotone"
                  />
                  <span class="content">{{ $t("table.delete") }}</span>
                </span>
              </li>
            </ul>
          </v-menu>
        </div>
      </template>

      <!-- Expand -->
      <template v-slot:expanded-row="{ columns, item }">
        <slot name="expand" :item="item" :columns="columns"></slot>
      </template>

      <!-- Bulk Actions && Pagination -->
      <template v-slot:bottom>
        <div class="bottom">
          <div class="wrapper" v-if="pageCount > 1 || selected.length > 0">
            <select-input
                v-if="selected.length > 0"
                @update:modelValue="updateBulkAction"
                :placeholder="$t('placeholders.bulk_actions')"
                :static-items="bulkActionOptions"
                hide-details
                class="select"
                up_mode
            />
            <v-pagination
              v-if="pageCount > 1"
              color="orange"
              v-model="page"
              :length="pageCount"
              :total-visible="useHelpers().isSmallScreen() ? 1 : 5"
            >
              <template v-slot:prev>
                <base-button
                  v-ripple
                  class="prev pagination"
                  :class="{
                    disabled: page <= 1,
                    circle: useHelpers().isSmallScreen(),
                  }"
                  @click="page > 1 ? (page -= 1) : null"
                >
                  <Icon name="material-symbols:arrow-left-alt-rounded" />
                  <span v-if="!useHelpers().isSmallScreen()">{{
                    $t("form.previous")
                  }}</span>
                </base-button>
              </template>

              <template v-slot:next>
                <base-button
                  v-if="rows?.length > 1"
                  class="animate_primary_filled pagination"
                  :class="{
                    disabled: page >= pageCount,
                    circle: useHelpers().isSmallScreen(),
                  }"
                  @click="page < pageCount ? (page += 1) : null"
                >
                  <span v-if="!useHelpers().isSmallScreen()">{{
                    $t("form.next")
                  }}</span>
                  <Icon name="material-symbols:arrow-right-alt-rounded" />
                </base-button>
              </template>
            </v-pagination>
          </div>
        </div>
      </template>
    </v-data-table>

    <!-- Form -->
    <v-dialog v-model="dialog" max-width="420px">
      <v-form ref="form" @submit.prevent="save">
        <CustomTypeTableForm
            :mode="edit_item_index_in_rows === -1 ? 'add' : 'edit'"
            :title="formTitle"
            :inputs="inputs"
            @close="close"
        />
      </v-form>
    </v-dialog>
  </div>
</template>

<script setup>
defineOptions({
  inheritAttrs: false,
});

const props = defineProps({
  title: {
    type: String,
    default: "Table",
  },
  url: {
    type: String,
    required: true,
    default: "",
  },
  headers: {
    type: Array,
    required: true,
    default: () => [],
  },
  form: {
    type: Array,
    required: true,
    default: () => [],
  },
  path: {
    type: String,
    default: "",
  },
  add_label: {
    type: String,
    default: "",
  },
  breedcrumb_label: {
    type: String,
    default: "",
  },
  id: {
    type: Number,
    default: "",
  },
  breedcrumb: {
    type: Boolean,
    default: false,
  }
});

const nuxtApp = useNuxtApp();
const locale = nuxtApp.$i18n.t;
const type = ref(null);

const bulkActionOptions = ref([
  { id: "delete_all", name: locale("form.delete_all") }
]);

useSeoMeta({
  title: useNuxtApp().$i18n.t(`labels.type`),
});

// ===== Breedcrumb
import { useGlobalStore } from "@/stores/global";

const updateBulkAction = (val) => {
  if (val.id == "delete_all") {
    deleteSelected();
  }
};

// ============ Filter
const filter_table = (filter_obj) => {
  filter_obj.type_id = props.id;
  loadItems(page.value, filter_obj);
};

// ============ Custome Headers
const _headers = computed(() => {
  const all_headers = [
    ...props.headers.map((header) => {
      return { ...header, align: "center" };
    }),
    {
      title: nuxtApp.$i18n.t("labels.actions"),
      value: "actions",
      align: "center",
      sortable: false,
    },
  ];
  return all_headers.map((header) => {
    return {
      ...header,
      align: header.align ? header.align : "start",
      sortable: header.sortable ? header.sortable : false,
    };
  });
});

// ============ Featuers
const selected = ref([]);
const expanded = ref([]);

// ============ Pagination
const page = ref(1);
const itemsPerPage = ref(10);
const pageCount = computed(() => {
  return Math.ceil(totalItems.value / itemsPerPage.value);
});

// ============ Get Data
const form = ref(null);
const rows = ref([]);
const totalItems = ref(0);
const table_loading = ref(false);
const loadItems = async (_page, params) => {
  table_loading.value = true;
  const res_data = await useCustomTypeCrudApi().getTable(props.url, _page, params??{type_id : props.id})
  rows.value = res_data?.data;
  totalItems.value = res_data?.meta?.total;
  itemsPerPage.value = res_data?.meta?.per_page;

  table_loading.value = false;
};
watch(
  page,
  () => {
    loadItems(page.value);
    if(props.breedcrumb) {
      show()
    }
  },
  { immediate: true }
);

// ============ Dialogs
const dialog = ref(false);
watch(dialog, (val) => {
  val || close();
});

const inputs = ref([]);

// ============ Add Item
const add_item_fields = ref([]);
const setItemKeysForAdd = () => {

  props.form.forEach((item) => {
    if (!item.not_addable) {
      add_item_fields.value.push({ ...item, val: null });
    }
  });

  inputs.value = [...add_item_fields.value];
};
const addItem = () => {
  setItemKeysForAdd();
  dialog.value = true;
};

// ============ Close And Save
const close = async () => {
  dialog.value = false;
  await nextTick();
  add_item_fields.value = [];
  selected.value = [];
  item_to_delete.value = null;
};

// ============ Form Title add_label
const formTitle = computed(() => {
  return nuxtApp.$i18n.t("form.attach") + ' ' + nuxtApp.$i18n.t(`labels.${props.add_label.toLowerCase()}`) ;
});

// ============ Delete Item
const item_to_delete = ref(null);
const deleteItem = (item) => {
  item_to_delete.value = Object.assign({}, item);
  nuxtApp.$Swal
    .fire({
      icon: "warning",
      title: nuxtApp.$i18n.t("table.delete_item_confirm"),
      showDenyButton: true,
      confirmButtonText: nuxtApp.$i18n.t("form.delete"),
      denyButtonText: nuxtApp.$i18n.t("form.cancel"),
    })
    .then((result) => {
      if (result.isConfirmed) {
        deleteItemConfirm();
      }
    });
};

const deleteItemConfirm = async () => {
  // Api Delete
  let id = `${props.add_label}` + `_id`
  await useCustomTypeCrudApi().deleteRow('admin/types/detach-'+ `${props.add_label}` + `/${props.id}`,{
    [id]: item_to_delete.value.id
  });
  rows.value = rows.value.filter((row) => row.id != item_to_delete.value.id);
};

// ============ Delete Selected
const deleteSelected = async () => {
  const result = await nuxtApp.$Swal.fire({
    icon: "warning",
    title: nuxtApp.$i18n.t("table.delete_items_confirm"),
    showDenyButton: true,
    confirmButtonText: nuxtApp.$i18n.t("form.delete"),
    denyButtonText: nuxtApp.$i18n.t("form.cancel"),
  });

  if (result.isConfirmed) {
    await deleteSelectedConfirm();
    useSuccessToas(nuxtApp.$i18n.t("form.deleteSuccess"));
  }
};

const deleteSelectedConfirm = async () => {
  // Api Delete
  let id = `${props.add_label}` +  `${props.add_label != 'feature'? 's':''}`;
  await useCustomTypeCrudApi().bulkDeleteRow('admin/types/bulk-detach-'+ `${props.add_label}` + `/${props.id}`, {
    [id]: selected.value.map((el) => el.id),
  });
  rows.value = rows.value.filter((row) => {
    let found = false;

    for (let i = 0; i < selected.value.length; i++) {
      if (row.id == selected.value[i].id) {
        found = true;
        break;
      }
    }
    return !found;
  });
};

const save = async () => {
  const { valid } = await form.value.validate();
  if (!valid) return;
    let new_item = {};
    add_item_fields.value.forEach((add_item_field) => {
      // Switch
      if (add_item_field.type == "switch") {
        new_item[add_item_field.key] = add_item_field.val ? 1 : 0;
        return;
      }
      // Image
      if (add_item_field.type == "image") {
        new_item[add_item_field.key] = add_item_field.val.img_file;
        return;
      }
      // Single Select
      if (add_item_field.type == "select" && !add_item_field.multiple) {
        if (has_alpha.test(add_item_field.val.id)) {
          new_item[add_item_field.key] = add_item_field.val.id;
        } else {
          new_item[add_item_field.key] = +add_item_field.val.id;
        }
        return;
      }
      // Multiple Select
      else if (add_item_field.multiple) {
        new_item[add_item_field.key] = add_item_field.val.map(
            (item) => +item.id
        );
        return;
      }
      // Default
      else {
        new_item[add_item_field.key] = add_item_field.val;
      }
    });

    const form_data = new FormData();
    for (let key in new_item) {
      const value = new_item[key];

      if (Array.isArray(value)) {
        value.forEach((item, index) => {
          form_data.append(key + `[${index}]`, item);
        });
        continue;
      }

      form_data.append(key, new_item[key]);
    }

    if (await useCustomTypeCrudApi().addRow('admin/types/attach-'+ `${props.add_label}` + `/${props.id}`, form_data)) {
      close();
      loadItems(page.value);
    }

};

async function show() {
  type.value = await  useCustomTypeCrudApi().getShow('admin/types'+ `/${props.id}`);
  if(!type.value){
    useRouter().push('/lookups/types/list');
  }

  useGlobalStore().breedcrumbItems = [
    {
      text: useNuxtApp().$i18n.t(`labels.type`),
      active: false,
      href: '/lookups/types/list'
    },
    {
      text: type.value?useHelpers().lang() == 'ar'?type.value.name_ar:type.value.name_en:'',
      active: true
    },
  ];
}
</script>

<style scoped lang="scss"></style>
