<template>
  <nav
    v-if="mounted"
    class="sideNav"
    @click="$emit('openSidebar')"
    :class="{
      sidebar_is_closed: sidebar_is_closed,
      mobile: useHelpers().isSmallScreen(),
    }"
  >
    <header class="sidebar_header">
      <Logo fixed_theme="light" :mobile="sidebar_is_closed" />
    </header>

    <v-list
      :class="{ sidebar_is_closed: sidebar_is_closed }"
      class="sideNavList"
      v-model:opened="open"
      density="compact"
      nav
    >
      <div
        class="sidebar_section mb-2"
        v-for="(section, key) of sidebar"
        :key="key"
      >
        <template
          v-if="
            useHelpers().hasPermission(section.permission) &&
            section.items.some((item) => item.visible)
          "
        >
          <div
            class="sub_header"
            :class="{ sidebar_is_closed: sidebar_is_closed }"
          >
            {{ sidebar_is_closed ? "..." : section.title }}
          </div>

          <div class="sidebar_item" v-for="(item, index) in section.items">
            <tmplate v-if="item.visible">
              <template v-if="item.link">
                <v-list-item
                  :key="index"
                  :value="item.id"
                  :to="item.link"
                  color="primary"
                >
                  <template v-slot:prepend>
                    <Icon :name="item.icon" />
                  </template>

                  <v-list-item-title v-text="item.title"></v-list-item-title>

                  <template v-if="item.append" v-slot:append>
                    <span class="hot">{{ item.append }}</span>
                  </template>
                </v-list-item>
              </template>

              <template v-if="item.childs?.length > 0">
                <v-list-group color="primary" :value="item.id">
                  <template v-slot:activator="{ props }">
                    <v-list-item v-bind="props" :title="item.title">
                      <template v-slot:prepend>
                        <Icon :name="item.icon" />
                      </template>
                    </v-list-item>
                  </template>

                  <template
                    v-for="(child, child_index) in item.childs"
                    :key="child_index"
                  >
                    <template v-if="child.visible">
                      <template v-if="child.link">
                        <v-list-item
                          :title="child.title"
                          :value="child.id"
                          :to="child.link"
                          color="primary"
                        >
                          <template v-slot:prepend>
                            <Icon
                              v-if="child.icon"
                              size="10"
                              name="child.icon"
                            />
                            <Icon v-else size="10" name="mdi:circle-slice-8" />
                          </template>
                        </v-list-item>
                      </template>

                      <template v-if="child.childs?.length > 0">
                        <v-list-group color="primary" :value="child.id">
                          <template v-slot:activator="{ props }">
                            <v-list-item v-bind="props" :title="child.title">
                              <template v-slot:prepend>
                                <Icon
                                  size="15"
                                  :name="child.icon || 'mdi:minus'"
                                />
                              </template>
                            </v-list-item>
                          </template>

                          <template
                            v-for="(sub_child, sub_child_index) in child.childs"
                            :key="sub_child_index"
                          >
                            <template v-if="sub_child.visible">
                              <template v-if="sub_child.link">
                                <v-list-item
                                  :title="sub_child.title"
                                  :value="sub_child.id"
                                  :to="sub_child.link"
                                  color="primary"
                                >
                                  <template v-slot:prepend>
                                    <Icon
                                      size="5"
                                      :name="
                                        sub_child.icon || 'mdi:circle-slice-8'
                                      "
                                    />
                                  </template>
                                </v-list-item>
                              </template>
                            </template>
                          </template>
                        </v-list-group>
                      </template>
                    </template>
                  </template>
                </v-list-group>
              </template>
            </tmplate>
          </div>
        </template>
      </div>
    </v-list>
  </nav>
</template>

<script setup>
const props = defineProps({
  sidebar_is_closed: Boolean,
});

const { $i18n: locale } = useNuxtApp();

const sidebar = ref({
  menu: {
    title: locale.t("sidebar.menue"),
    permission: "access-menuSectionDashboard",
    visible: true,
    items: [
      // Requests
      {
        visible: useHelpers().hasAnyPermission([
          "requests-add-property",
          "requests-add-auction",
          "requests-service",
        ]),
        id: "requests",
        title: locale.t("sidebar.requests"),
        icon: "tabler:git-pull-request",
        childs: [
          {
            permission: "requests-add-property",
            visible: useHelpers().hasPermission("requests-add-property"),
            id: "requests-add-property",
            title: locale.t("sidebar.add_property"),
            link: "/requests/add-property",
          },
          {
            permission: "requests-add-auction",
            visible: useHelpers().hasPermission("requests-add-auction"),
            id: "requests-add-auction",
            title: locale.t("sidebar.add_auction"),
            link: "/requests/add-auction",
          },
          {
            permission: "requests-service",
            visible: useHelpers().hasPermission("requests-service"),
            id: "requests-service",
            title: locale.t("sidebar.services"),
            link: "/requests/service",
          },
        ],
      },
      // Auctions
      {
        visible: useHelpers().hasAnyPermission([
          "live-auctions",
          "auctions-bits",
        ]),
        id: "auctions",
        title: locale.t("sidebar.auctions"),
        icon: "mingcute:announcement-line",
        childs: [
          {
            permission: "live-auctions",
            visible: useHelpers().hasPermission("live-auctions"),
            id: "auctions-live-auctions",
            title: locale.t("sidebar.live_auctions"),
            link: "/auctions/live-acutions",
          },
          {
            permission: "auctions-bits",
            visible: useHelpers().hasPermission("auctions-bits"),
            id: "auctions-bits",
            title: locale.t("sidebar.bits"),
            link: "/auctions/bits",
          },
        ],
      },
      // Members
      {
        visible: useHelpers().hasAnyPermission(["list-memberships"]),
        id: "members",
        title: locale.t("sidebar.members"),
        icon: "solar:user-outline",
        childs: [
          {
            permission: "list-memberships",
            visible: useHelpers().hasPermission("list-memberships"),
            id: "list-individual",
            title: locale.t("sidebar.individual"),
            link: "/members/individual/list",
          },
          {
            permission: "list-memberships",
            visible: useHelpers().hasPermission("list-memberships"),
            id: "list-companies",
            title: locale.t("sidebar.companies"),
            link: "/members/company/list",
          },
        ],
      },
      // Brokers
      {
        visible: useHelpers().hasAnyPermission(["list-memberships"]),
        id: "brokers",
        title: locale.t("sidebar.Brokers"),
        icon: "solar:user-outline",
        childs: [
          {
            permission: "list-memberships",
            visible: useHelpers().hasPermission("list-memberships"),
            id: "list-individual-broker",
            title: locale.t("sidebar.individual"),
            link: "/brokers/individual/list",
          },
          {
            permission: "list-memberships",
            visible: useHelpers().hasPermission("list-memberships"),
            id: "list-companies-broker",
            title: locale.t("sidebar.companies"),
            link: "/brokers/company/list",
          },
        ],
      },
    ],
  },

  samh_workspace: {
    title: locale.t("sidebar.samh_workspace"),
    permission: "access-samh-workspace-sectionDashboard",
    items: [
      // Our Auctions
      {
        visible: useHelpers().hasAnyPermission(["list-auctions"]),
        id: "our-auctions",
        title: locale.t("sidebar.our_auctions"),
        icon: "mingcute:announcement-line",
        childs: [
          {
            permission: "list-auctions",
            visible: useHelpers().hasPermission("list-auctions"),
            id: "list-our-auctions",
            title: locale.t("sidebar.all_auctions"),
            link: "/auctions/list",
          },
        ],
      },
      // Employees
      {
        visible: useHelpers().hasAnyPermission(["list-employees"]),
        id: "employees",
        title: locale.t("sidebar.empolyees"),
        icon: "solar:user-outline",
        childs: [
          {
            permission: "list-employees",
            visible: useHelpers().hasPermission("list-employees"),
            id: "list-employees",
            title: locale.t("sidebar.all_empolyees"),
            link: "/employees/list",
          },
        ],
      },
    ],
  },

  controle: {
    permission: "access-control-sectionDashboard",
    title: locale.t("sidebar.controle"),
    items: [
      // Memberships
      {
        visible: useHelpers().hasAnyPermission(["list-memberships"]),
        id: "memberships",
        title: locale.t("sidebar.memberships"),
        icon: "fa6-solid:money-check-dollar",
        childs: [
          {
            permission: "list-memberships",
            visible: useHelpers().hasPermission("list-memberships"),
            id: "list-memberships",
            title: locale.t("sidebar.all_memberships"),
            link: "/memberships",
          },
        ],
      },
      // Lookups
      {
        visible: useHelpers().hasAnyPermission([
          "list-propertyUsage",
          "list-propertyType",
          "list-propertyDescription",
          "list-propertyFeature",
          "list-propertyUtilities",
          "list-propertyFace",
          "list-regions",
          "list-cities",
          "list-districts",
        ]),
        id: "lookups",
        title: locale.t("sidebar.lookups"),
        icon: "ic:round-search",
        childs: [
          // Property
          {
            visible: useHelpers().hasAnyPermission([
              "list-propertyUsage",
              "list-propertyType",
              "list-propertyDescription",
              "list-propertyFeature",
              "list-propertyUtilities",
              "list-propertyFace",
            ]),
            id: "lookups-property",
            title: locale.t("sidebar.property"),
            childs: [
              // Usages
              {
                permission: "list-propertyUsage",
                visible: useHelpers().hasPermission("list-propertyUsage"),
                id: "lookups-property-usages",
                title: locale.t("sidebar.usages"),
                link: "/lookups/usages/list",
              },
              // Types
              {
                permission: "list-propertyType",
                visible: useHelpers().hasPermission("list-propertyType"),
                id: "lookups-property-types",
                title: locale.t("sidebar.types"),
                link: "/lookups/types/list",
              },
              // Descreptions
              {
                permission: "list-propertyDescription",
                visible: useHelpers().hasPermission("list-propertyDescription"),
                id: "lookups-property-descreptions",
                title: locale.t("sidebar.descreptions"),
                link: "/lookups/descreptions/list",
              },
              // Features
              {
                permission: "list-propertyFeature",
                visible: useHelpers().hasPermission("list-propertyFeature"),
                id: "lookups-property-features",
                title: locale.t("sidebar.features"),
                link: "/lookups/features/list",
              },
              // Utilities
              {
                permission: "list-propertyUtilities",
                visible: useHelpers().hasPermission("list-propertyUtilities"),
                id: "lookups-property-utilities",
                title: locale.t("sidebar.utilities"),
                link: "/lookups/utilities/list",
              },
              // Faces
              {
                permission: "list-propertyUtilities",
                visible: useHelpers().hasPermission("list-propertyFace"),
                id: "lookups-property-faces",
                title: locale.t("sidebar.faces"),
                link: "/lookups/faces/list",
              },
            ],
          },
          // Address
          {
            visible: useHelpers().hasAnyPermission([
              "list-regions",
              "list-cities",
              "list-districts",
            ]),
            id: "lookups-address",
            title: locale.t("sidebar.saudi_arabia"),
            childs: [
              // Regions
              {
                permission: "list-regions",
                visible: useHelpers().hasPermission("list-regions"),
                id: "lookups-address-regions",
                title: locale.t("sidebar.regions"),
                link: "/lookups/regions/list",
              },
              // Cities
              {
                permission: "list-cities",
                visible: useHelpers().hasPermission("list-cities"),
                id: "lookups-address-cities",
                title: locale.t("sidebar.cities"),
                link: "/lookups/cities/list",
              },
              // Districts
              {
                permission: "list-districts",
                visible: useHelpers().hasPermission("list-districts"),
                id: "lookups-address-districts",
                title: locale.t("sidebar.districts"),
                link: "/lookups/districts/list",
              },
            ],
          },
        ],
      },
      // Polices
      {
        visible: useHelpers().hasAnyPermission([
          "list-roles",
          "list-permissions",
        ]),
        id: "polices",
        title: locale.t("sidebar.polices"),
        icon: "carbon:ibm-cloud-key-protect",
        childs: [
          // Roles
          {
            permission: "list-roles",
            visible: useHelpers().hasPermission("list-roles"),
            id: "list-roles",
            title: locale.t("sidebar.roles"),
            link: "/roles/list",
          },
          // Permissions
          {
            permission: "list-permissions",
            visible: useHelpers().hasPermission("list-permissions"),
            id: "list-permissions",
            title: locale.t("sidebar.permissions"),
            link: "/permissions/list",
          },
        ],
      },
      // Website
      {
        visible: useHelpers().hasAnyPermission(["list-header", "list-footer"]),
        id: "website",
        title: locale.t("sidebar.website"),
        icon: "tabler:world-share",
        childs: [
          // Header
          {
            visible: useHelpers().hasPermission("list-header"),
            permission: "list-header",
            id: "list-header",
            title: locale.t("sidebar.header"),
            link: "/header/list",
          },
          // Footer
          {
            visible: useHelpers().hasPermission("list-footer"),
            permission: "list-footer",
            id: "list-footer",
            title: locale.t("sidebar.footer"),
            link: "/footer/list",
          },
        ],
      },
    ],
  },
});

const open = ref([]);

watchEffect(() => {
  if (props.sidebar_is_closed) {
    open.value = [];
  } else {
    open.value = [];
  }
});

const mounted = ref(false);
onMounted(() => {
  mounted.value = true;
});
</script>

<style lang="scss">
.sideNav {
  position: fixed;
  right: 0;
  transition: var(--layout_transition);
  width: var(--sidebar_width);
  background-color: var(--secondary);
  color: #fff;

  header.sidebar_header {
    border-bottom: 1.5px solid var(--sidebar_border);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: var(--header_height);

    a {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      color: inherit;

      .image {
        overflow: hidden;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        img {
          transition: all 0.2s linear;
          width: 50px;
          height: 50px;
          border-radius: 50%;

          &:hover {
            transform: scale(1.2);
          }
        }
      }

      h4 {
        transition: all 0.2s linear;
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }

  footer.sidebar_footer {
    height: var(--sidebar_footer_height);
    display: block;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;

    .user {
      display: flex;
      align-items: center;
      gap: 10px;
      border-bottom: 1px solid var(--sidebar_border);
      padding: 15px 15px 20px 15px;

      .image {
        position: relative;

        img {
          cursor: pointer;
          width: 40px;
          height: 40px;
        }

        &::before {
          content: "";
          width: 15px;
          height: 15px;
          border-radius: 50%;
          position: absolute;
          bottom: -2px;
          right: -1px;
          background-color: #12b76a;
          border: 2px solid var(--main_bg);
        }
      }

      .txt {
        display: flex;
        flex-direction: column;
        line-height: 23px;
        font-size: 15px;
        font-family: "Noto Kufi Arabic Variable", sans-serif;

        a {
          color: #fff;
          font-size: 14px;
        }
      }
    }

    button {
      flex-shrink: 0;
    }

    &.sidebar_is_closed {
      .user {
        padding: 0 0 15px 0;
        justify-content: center;

        img {
          width: 40px;
          height: 40px;
        }

        .txt {
          display: none;
        }
      }
    }
  }

  &.sidebar_is_closed {
    width: var(--sidebar_close_width);
    .sidebar_header {
      padding-inline: 10px;
      a {
        .image {
          width: 30px;
          height: 30px;
          img {
            width: 30px;
            height: 30px;
          }
        }
      }
    }
  }
  &.mobile {
    height: calc(100vh - var(--header_height));
    top: var(--header_height);
  }
}

body.ltr {
  .sideNav {
    right: unset;
    left: 0;
  }
}
</style>
