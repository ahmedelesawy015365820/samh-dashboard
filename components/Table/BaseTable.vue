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
      <template v-slot:item.image="{ item }">
        <NuxtImg
          alt="item image"
          class="rounded-circle"
          :src="`https://cdn.vuetifyjs.com/docs/images/graphics/gpus/${item.image}`"
          preset="default"
          height="64"
          width="64"
        ></NuxtImg>
      </template>
      <template v-slot:item.image_url="{ item }">
        <NuxtImg
          alt="item image"
          class="rounded-circle"
          :src="item.image_url"
          preset="default"
          height="64"
          width="64"
        ></NuxtImg>
      </template>
      <template v-slot:item.logo_url="{ item }">
        <NuxtImg
          alt="item image"
          class="rounded-circle"
          :src="item.logo_url"
          preset="default"
          height="64"
          width="64"
        ></NuxtImg>
      </template>
      <template v-slot:item.profile_image="{ item }">
        <NuxtImg
          alt="item image"
          class="rounded-circle"
          :src="item.profile_image || '/Temp/property.png'"
          preset="default"
          height="64"
          width="64"
        ></NuxtImg>
      </template>

      <template v-slot:item.name_ar="{ item }">
        <span>{{ item.name_ar }}</span>
      </template>
      <template v-slot:item.name_en="{ item }">
        <div class="linkale_name" v-if="external_show">
          <nuxt-link :to="external_show">
            {{ item.name_en }}
          </nuxt-link>
        </div>
        <div class="linkale_name" v-if="url  == 'admin/types'">
          <nuxt-link :to="`/lookups/types/${item.id}`">
            {{ item.name_en }}
          </nuxt-link>
        </div>
        <span v-else>{{ item.name_en }}</span>
      </template>

      <template v-slot:item.status="{ item }">
        <v-chip label :color="useHelpers().getStatus(item.status).color">{{
          useHelpers().getStatus(item.status).text
        }}</v-chip>
      </template>

      <template v-slot:item.paragraph_ar="{ item }">
        {{ item.paragraph_ar.slice(0, 30) + "..." }}
      </template>
      <template v-slot:item.paragraph_en="{ item }">
        {{ item.paragraph_ar.slice(0, 30) + "..." }}
      </template>

      <template v-slot:item.rating="{ item }">
        <v-rating
          :model-value="item.rating"
          color="orange-darken-2"
          density="compact"
          size="small"
          readonly
        ></v-rating>
      </template>

      <template v-slot:item.created_at="{ item }">
        <span>{{ useHelpers().formatDate(item.created_at) }}</span>
      </template>
      <template v-slot:item.updated_at="{ item }">
        <span>{{ useHelpers().formatDate(item.updated_at) }}</span>
      </template>

      <template v-slot:item.is_active="{ item }">
        <v-chip
          class="status"
          :color="item.is_active ? '#34D399' : '#EF4444'"
          :text="item.is_active ? $t('labels.active') : $t('labels.in_active')"
          label
        ></v-chip>
      </template>

      <template v-slot:item.employeeStatus="{ item }">
        <v-chip
          v-if="item.employeeStatus == 1"
          :color="'#34D399'"
          :text="$t('labels.active')"
          label
        ></v-chip>
        <v-chip
          v-if="item.employeeStatus == 0"
          :color="'#1e2640'"
          :text="$t('labels.in_active')"
          label
          size="small"
        ></v-chip>
        <v-chip
          v-if="item.employeeStatus == 2"
          :color="'#EF4444'"
          :text="$t('labels.blocked')"
          label
          size="small"
        ></v-chip>
      </template>

      <template v-slot:item.memberStatus="{ item }">
        <v-chip
            v-if="item.memberStatus == 1"
            :color="'#34D399'"
            :text="$t('labels.active')"
            label
        ></v-chip>
        <v-chip
            v-if="item.memberStatus == 0"
            :color="'#1e2640'"
            :text="$t('labels.pending')"
            label
            size="small"
        ></v-chip>
        <v-chip
            v-if="item.memberStatus == 2"
            :color="'#EF4444'"
            :text="$t('labels.blocked')"
            label
            size="small"
        ></v-chip>
      </template>

      <template v-slot:item.property_types="{ item }">
        <div class="d-flex justify-center">
          <v-chip
            class="ma-1"
            v-for="_type in item.property_types"
            :color="
              useHelpers().getRandomColor(useHelpers().lang() == 'ar'? _type.name_ar : _type.name_en)
            "
            :text="useHelpers().lang() == 'ar' ? _type.name_ar :_type.name_en"
            label
            size="small"
          ></v-chip>
        </div>
      </template>

      <template v-slot:item.roles="{ item }">
        <div class="d-flex justify-center">
          <v-chip
            class="ma-1"
            v-for="role in item.roles"
            :text="useHelpers().lang() == 'ar'?role.name_ar : role.name_en"
            label
            size="small"
          ></v-chip>
        </div>
      </template>

      <template v-slot:item.region_city="{ item }">
        <div class="d-flex justify-center">
          {{ item?.city?.region?.name || "" }}
        </div>
      </template>

      <template v-slot:item.type="{ item }">
        <div class="type">
          <span class="circle"></span>
          <span class="content">{{
            item.type == 1 ? $t("labels.facility") : $t("labels.amenity")
          }}</span>
        </div>
      </template>

      <template v-slot:item.type_city="{ item }">
          <span class="content">{{
            item.type_city == 1 ? $t("labels.city") : $t("labels.village")
          }}</span>
      </template>

      <template v-slot:item.contact_info_member="{ item }">
          <span>{{ `${item.email}  ${item.phone_number}` }}</span>
      </template>

      <template v-slot:item.plan="{ item }">
        <span>{{ item?.subscription?.plan?.name ?? "-" }}</span>
      </template>

      <template v-slot:item.full_name_member="{ item }">
        <span>
             {{ `${ item['first_name_'+useHelpers().lang()]} ${item['second_name_'+useHelpers().lang()]} ${item['third_name_' + useHelpers().lang()]} ${item['last_name_' + useHelpers().lang()]}` }}
        </span>
      </template>

      <!-- Top -->
      <template v-slot:top>
        <header class="header d-flex align-center">
          <!--          <h2 class="mb-0 me-5 me-lg-16">{{ title }}</h2>-->

          <div class="filter flex-grow-1 me-4">
            <TableFilter
              :add_label="add_label"
              :permissions="permissions"
              :path="path"
              :url="url"
              @table_filtered="filter_table"
            />
          </div>

          <div class="btns">
            <base-button
              v-if="permissions.create && path"
              @click="navigateTo(`/${path}/add`)"
              class="animate_primary_filled"
            >
              <Icon name="ic:outline-add" />
              {{
                $t("form.add") + " " + $t(`labels.${add_label.toLowerCase()}`)
              }}
            </base-button>
            <base-button
              v-if="permissions.create && !path"
              @click="addItem"
              class="animate_primary_filled"
            >
              <Icon name="ic:outline-add" />
              {{
                $t("form.add") + " " + $t(`labels.${add_label.toLowerCase()}`)
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
              <!-- View -->
              <li class="delete" v-ripple v-if="permissions.view && path">
                <span @click="navigateTo(`/${path}/show`)">
                  <Icon
                    size="25"
                    name="solar:trash-bin-minimalistic-2-bold-duotone"
                  />
                  <span class="content">{{ $t("table.view") }}</span>
                </span>
              </li>

              <!-- Edit -->
              <li v-ripple v-if="props.path && permissions.edit">
                <span @click="navigateTo(`/${props.path}/${item.id}/edit`)">
                  <Icon name="solar:pen-new-square-line-duotone" />
                  <span class="content">{{ $t("table.edit") }}</span>
                </span>
              </li>
              <li v-ripple v-if="!props.path && permissions.edit">
                <span @click="editItem(item)">
                  <Icon name="solar:pen-new-square-line-duotone" />
                  <span class="content">{{ $t("table.edit") }}</span>
                </span>
              </li>

              <!-- Delete -->
              <li class="delete" v-ripple v-if="permissions.delete">
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
        <TableForm
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
  external_show: {
    type: Boolean,
  },
  showExpand: {
    type: Boolean,
    default: false,
    required: false,
  },
  add_label: {
    type: String,
    default: "",
  },
  breedcrumb_label: {
    type: String,
    default: "",
  },
  permissions: {
    type: Object,
    default: () => {
      return {
        view: true,
        edit: true,
        delete: true,
      };
    },
  },
});

useSeoMeta({
  title: useNuxtApp().$i18n.t(`breedcrumb.${props.breedcrumb_label}.title`),
});

const nuxtApp = useNuxtApp();

const locale = nuxtApp.$i18n.t;

const bulkActionOptions = ref([
  { id: "delete_all", name: locale("form.delete_all") },
  { id: "activate_all", name: locale("form.activate_all") },
  { id: "deactivate_all", name: locale("form.deactivate_all") },
]);
const updateBulkAction = (val) => {
  if (val.id == "delete_all") {
    deleteSelected();
  } else if (val.id == "activate_all" || val.id == "deactivate_all") {
    inActiveOrActiveSelected(val.id);
  }
};

// ===== Breedcrumb
import { useGlobalStore } from "@/stores/global";
useGlobalStore().breedcrumbItems = [
  {
    text: useNuxtApp().$i18n.t(`breedcrumb.${props.breedcrumb_label}.title`),
    active: true,
  },
];

// ============ Filter
const filter_table = (filter_obj) => {
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
const rows = ref([]);
const totalItems = ref(0);
const table_loading = ref(false);
const loadItems = async (_page, params) => {
  table_loading.value = true;

  const res_data = await useCrudApi().getTable(props.url, _page, params);
  rows.value = res_data?.data;
  totalItems.value = res_data?.meta?.total;
  itemsPerPage.value = res_data?.meta?.per_page;

  table_loading.value = false;
};
watch(
  page,
  () => {
    loadItems(page.value);
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

// ============ Edit Item
const edit_item_fields = ref([]);
const edit_item_index_in_rows = ref(-1);
const setItemKeysForEdit = (item) => {
  props.form.forEach((item) => {
    edit_item_fields.value.push({ ...item, val: null });
  });

  inputs.value = [...edit_item_fields.value];
  setEditedItemValues(item);
};
const setEditedItemValues = (item) => {
  for (let row_key in item) {
    edit_item_fields.value.forEach((edit_item_field) => {
      if (edit_item_field.key == row_key) {
        // Switch
        if (edit_item_field.type == "switch") {
          edit_item_field.val = !!item[row_key];
          return;
        }
        // Select Static
        else if (edit_item_field.staticItems) {
          edit_item_field.val = edit_item_field.staticItems.find(
            (staticItem) => +staticItem.id == +item[row_key]
          );
          return;
        }
        // Select Multiple
        else if (edit_item_field.multiple) {
          edit_item_field.val = item[row_key].map((item) => {
            return {
              id: item.id,
              name: item.name_ar + " - " + item.name_en,
            };
          });
          return;
        }
        // Select Single
        else if (
          edit_item_field.type == "select" &&
          !edit_item_field.multiple
        ) {
          edit_item_field.val = {
            id: item[row_key].id,
            name: item[row_key].name_ar + " - " + item[row_key].name_en,
          };
          return;
        }
        // Default
        else {
          edit_item_field.val = item[row_key];
        }
      }
    });
  }
};
const editItem = (item) => {
  edit_item_index_in_rows.value = rows.value.indexOf(item);
  setItemKeysForEdit(item);
  dialog.value = true;
};

// ============ Form Title add_label
const formTitle = computed(() => {
  return edit_item_index_in_rows.value === -1
    ? nuxtApp.$i18n.t("form.add") +
        " " +
        nuxtApp.$i18n.t(`labels.${props.add_label.toLowerCase()}`)
    : nuxtApp.$i18n.t("form.edit") +
        " " +
        nuxtApp.$i18n.t(`labels.${props.add_label.toLowerCase()}`);
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
  await useCrudApi().deleteRow(props.url + `/${item_to_delete.value.id}`);
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
  await useCrudApi().bulkDeleteRow(props.url + `/bulk-delete`, {
    ids: selected.value.map((el) => el.id),
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

// ============ Active Selected
const inActiveOrActiveSelected = async (val) => {
  const result = await nuxtApp.$Swal.fire({
    icon: "warning",
    title: nuxtApp.$i18n.t("table.status_items_confirm"),
    showDenyButton: true,
    confirmButtonText: nuxtApp.$i18n.t("form.yes"),
    denyButtonText: nuxtApp.$i18n.t("form.cancel"),
  });

  if (result.isConfirmed) {
    await inActiveOrActiveSelectedConfirm(val);
    useSuccessToas(nuxtApp.$i18n.t("form.editSuccess"));
  }
};
const inActiveOrActiveSelectedConfirm = async (val) => {
  // Api Delete
  await useCrudApi().bulkStatusRow(props.url + `/change-status`, {
    ids: selected.value.map((el) => el.id),
    status: val == "activate_all" ? 1 : 0,
  });

  selected.value = [];

  loadItems(page.value);
};

// ============ Close And Save
const close = async () => {
  dialog.value = false;
  await nextTick();
  add_item_fields.value = [];
  edit_item_fields.value = [];
  edit_item_index_in_rows.value = -1;
  selected.value = [];
  item_to_delete.value = null;
};

const form = ref(null);
const has_alpha = /[a-zA-Z]/;
const save = async () => {
  const { valid } = await form.value.validate();
  if (!valid) return;

  // =========== Edit
  if (edit_item_index_in_rows.value > -1) {
    const item_in_rows = rows.value[edit_item_index_in_rows.value];
    let new_item = {};
    edit_item_fields.value.forEach((edit_item_field) => {
      // Switch
      if (edit_item_field.type == "switch") {
        new_item[edit_item_field.key] = edit_item_field.val ? 1 : 0;
        return;
      }
      // Image
      if (edit_item_field.type == "image") {
        if (
          edit_item_field &&
          edit_item_field.val &&
          edit_item_field.val.img_file
        ) {
          new_item[edit_item_field.key] = edit_item_field.val.img_file;
        }
        return;
      }
      // Single Select
      if (edit_item_field.type == "select" && !edit_item_field.multiple) {
        new_item[edit_item_field.key] = +edit_item_field.val.id;
        if (has_alpha.test(edit_item_field.val.id)) {
          new_item[edit_item_field.key] = edit_item_field.val.id;
        } else {
          new_item[edit_item_field.key] = +edit_item_field.val.id;
        }
        return;
      }
      // Multiple Select
      else if (edit_item_field.multiple) {
        new_item[edit_item_field.key] = edit_item_field.val.map(
          (item) => +item.id
        );
        return;
      }
      // Default
      else {
        new_item[edit_item_field.key] = edit_item_field.val;
      }
    });

    const form_data = new FormData();
    for (let key in new_item) {
      const value = new_item[key];

      if (Array.isArray(value)) {
        value.forEach((item, index) => {
          form_data.append(key + `[${index}]`, Number(item));
        });
        continue;
      }
      form_data.append(key, new_item[key]);
    }
    form_data.append("_method", "PUT");
    if (
      await useCrudApi().editRow(props.url + "/" + item_in_rows.id, form_data)
    ) {
      close();
      loadItems(page.value);
    }
  }
  // ============= Add
  else {
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

    if (await useCrudApi().addRow(props.url, form_data)) {
      close();
      loadItems(page.value);
    }
  }
};
</script>

<style scoped lang="scss">
  .linkale_name a {
    color: var(--primary) !important;
  }
</style>
