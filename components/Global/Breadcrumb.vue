<template>
  <section class="_breadcrumb">
    <v-breadcrumbs :items="breedcrumbItems">
      <template v-slot:divider>
        <span class="divider">
          <Icon
            color="#D0D5DD"
            size="15"
            v-if="useHelpers().dir() == 'rtl'"
            name="ic:twotone-arrow-back-ios-new"
          />
          <Icon
            color="#D0D5DD"
            size="15"
            v-if="useHelpers().dir() == 'ltr'"
            name="ic:twotone-arrow-forward-ios"
          />
        </span>
      </template>
      <template v-slot:item="{ item }">
        <nuxt-link
          :class="{
            _disabled: !item.href && !item.active,
            active: item.active,
          }"
          :to="item.href"
        >
          <Icon v-if="item.icon" color="#889099" size="25" :name="item.icon" />

          <span v-else>{{ useHelpers().capitalizeEveryWord(item.text) }}</span>
        </nuxt-link>
      </template>
    </v-breadcrumbs>
  </section>
</template>

<script setup>
const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
});

const locale = useNuxtApp().$i18n.t;
const breedcrumbItems = computed(() => {
  return [
    { text: locale("pages.home"), href: "/", icon: "mdi:home" },
    ...(props.items || []),
  ];
});
</script>

<style lang="scss">
._breadcrumb {
  background-color: transparent;
  margin-bottom: 15px;

  ul.v-breadcrumbs {
    padding-inline: 0;
    padding-block: 10px;

    a {
      span {
        font-size: 15px;
        color: #889099;
        font-weight: 400;
        opacity: 1;
      }

      &._disabled {
        span {
          color: #889099 !important;
          pointer-events: none;
        }
      }

      &.active {
        span {
          color: var(--primary);
          font-weight: 500;
        }
      }
    }
  }

  .v-breadcrumbs-divider {
    padding-inline: 5px !important;

    .divider {
      @include flex_center;
      margin-inline: 2px;
    }
  }
}
</style>
