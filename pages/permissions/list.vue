<template>
  <div class="listPermissions">
    <header class="top_header">
      <select-input
        v-model="data.role_id"
        :placeholder="$t('labels.role')"
        :static-items="all_roles"
        hide-details
        :return-object="false"
        up_mode
      />
      <base-button
        class="animate_primary_filled px-5"
        @click="updateRolePermissions"
      >
        <Icon name="ph:note-pencil-thin" class="mx-1" />
        {{ $t("form.edit") }}
      </base-button>
    </header>
    <div class="cruds">
      <v-expansion-panels multiple>
        <v-row>
          <v-col
            cols="12"
            lg="4"
            sm="6"
            v-for="(crud, index) in crud_permissions"
            :key="crud.id"
          >
            <div class="crud">
              <header class="crud_header">
                <v-checkbox
                  class="permission head"
                  color="#fff"
                  @update:model-value="select_all_boxes_updated($event, index)"
                  hide-details
                >
                  <template v-slot:label>
                    <span>{{ crud.title }}</span></template
                  ></v-checkbox
                >
              </header>
              <div class="boxes_wrapper">
                <div class="box">
                  <v-checkbox
                    class="permission"
                    color="primary"
                    v-model="data.permissions"
                    :value="crud.crudPermissions.create?.id"
                    hide-details
                  >
                    <template v-slot:label>
                      <span>{{ $t("pages.permissions.create") }}</span>
                    </template>
                  </v-checkbox>
                </div>
                <div class="box">
                  <v-checkbox
                    class="permission"
                    color="primary"
                    v-model="data.permissions"
                    :value="crud.crudPermissions.view?.id"
                    hide-details
                  >
                    <template v-slot:label>
                      <span>{{ $t("pages.permissions.view") }}</span>
                    </template>
                  </v-checkbox>
                </div>
                <div class="box">
                  <v-checkbox
                    class="permission"
                    color="primary"
                    v-model="data.permissions"
                    :value="crud.crudPermissions.update?.id"
                    hide-details
                  >
                    <template v-slot:label>
                      <span>{{ $t("pages.permissions.update") }}</span>
                    </template>
                  </v-checkbox>
                </div>
                <div class="box">
                  <v-checkbox
                    class="permission"
                    color="primary"
                    v-model="data.permissions"
                    :value="crud.crudPermissions.delete?.id"
                    hide-details
                  >
                    <template v-slot:label>
                      <span>{{ $t("pages.permissions.delete") }}</span>
                    </template>
                  </v-checkbox>
                </div>
                <div class="box">
                  <v-checkbox
                    class="permission"
                    color="primary"
                    v-model="data.permissions"
                    :value="crud.crudPermissions.list?.id"
                    hide-details
                  >
                    <template v-slot:label>
                      <span>{{ $t("pages.permissions.list") }}</span>
                    </template>
                  </v-checkbox>
                </div>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-expansion-panels>
    </div>
  </div>
</template>

<script setup>
const nuxtApp = useNuxtApp();

// ===== Breedcrumb
import { useGlobalStore } from "@/stores/global";
useGlobalStore().breedcrumbItems = [
  {
    text: nuxtApp.$i18n.t(`breedcrumb.permissions.title`),
    active: true,
  },
];

useHead({
  title: nuxtApp.$i18n.t("pages.permissions.title"),
});

definePageMeta({
  requireAuth: true,
});

const data = ref({
  role_id: null,
  permissions: [],
});
const select_all_boxes_updated = (checked, index) => {
  if (!checked) {
    // remove all the crud permissions from the permissions array
    data.value.permissions = data.value.permissions.filter((permission_id) => {
      return ![
        crud_permissions[index].crudPermissions.create?.id,
        crud_permissions[index].crudPermissions.view?.id,
        crud_permissions[index].crudPermissions.update?.id,
        crud_permissions[index].crudPermissions.delete?.id,
        crud_permissions[index].crudPermissions.list?.id,
      ].includes(permission_id);
    });
  } else {
    // push all the crud permissions to the permissions array if not exist already
    [
      crud_permissions[index].crudPermissions.create?.id,
      crud_permissions[index].crudPermissions.view?.id,
      crud_permissions[index].crudPermissions.update?.id,
      crud_permissions[index].crudPermissions.delete?.id,
      crud_permissions[index].crudPermissions.list?.id,
    ].forEach((permission_id) => {
      if (!data.value.permissions.includes(permission_id)) {
        data.value.permissions.push(permission_id);
      }
    });
  }
};

// Get the permissions for the selected role
watch(
  () => data.value.role_id,
  async (newVal) => {
    if (newVal) {
      data.value.permissions = await permissionsService().getPermissionsToRole(
        newVal
      );
    } else {
      data.value.permissions = [];
    }
  }
);

// Update the permissions for the selected role
const updateRolePermissions = async () => {
  await permissionsService().updateRolePermissions({
    role_id: data.value.role_id,
    permissions: data.value.permissions,
  });
};

const permissions_and_roles =
  await permissionsService().getRolesAndPermissions();

const all_permissions = permissions_and_roles.permissions;
const all_roles = permissions_and_roles.roles;
data.value.role_id = all_roles[0].id;

// Loop over the permissions and return the last "-string" from every permission and remove dublicates
const getHeadPermissionsTitels = () => {
  return all_permissions.reduce((acc, permission) => {
    const permissionTitle = permission.name.split("-").pop();
    if (!acc.includes(permissionTitle)) {
      acc.push(permissionTitle);
    }
    return acc;
  }, []);
};

// loop over the HeadPermissions, for each HeadPermission loop over the permissions and return the crud permissions for this headPermission if exists, then group all the crud permissions for each headPermission
const getAllCrudPermissionsForEachPermission = () => {
  const headPermissions = getHeadPermissionsTitels();

  return headPermissions.reduce((acc, headPermission) => {
    const crudPermissions = all_permissions.reduce((acc, permission) => {
      if (permission.name.includes(headPermission)) {
        if (permission.name.includes("create")) {
          acc.create = permission;
        } else if (permission.name.includes("view")) {
          acc.view = permission;
        } else if (permission.name.includes("edit")) {
          acc.update = permission;
        } else if (permission.name.includes("delete")) {
          acc.delete = permission;
        } else if (permission.name.includes("list")) {
          acc.list = permission;
        }
      }
      return acc;
    }, {});

    if (Object.keys(crudPermissions).length > 0) {
      acc.push({ title: headPermission, crudPermissions });
    }
    return acc;
  }, []);
};

const crud_permissions = getAllCrudPermissionsForEachPermission();

// Get the non crud permissions
const non_crud_permissions = all_permissions.filter(
  (permission) =>
    !permission.name.includes("create") &&
    !permission.name.includes("view") &&
    !permission.name.includes("edit") &&
    !permission.name.includes("delete") &&
    !permission.name.includes("list")
);
</script>

<style lang="scss" scoped>
.top_header {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 15px;
  margin-bottom: 20px;

  .select {
    min-width: 120px;
    margin: 0;
  }

  button {
    height: 40px;
  }
}

.cruds {
  .crud {
    .crud_header {
      background-color: var(--primary);
      border-radius: 10px 10px 0 0;
      padding: 10px 15px;
    }
    .boxes_wrapper {
      background: var(--main_bg);
      border-radius: 0 0 10px 10px;
      padding-block: 10px;
      .box {
        padding: 2px 15px;
      }
    }
  }
}
</style>
