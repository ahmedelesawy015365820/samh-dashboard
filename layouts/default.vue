<template>
  <div class="default_layout">
    <TheSidebar
      :key="useAuthStore().permissions"
      @toggleSidebar="toggleSidebar"
      @openSidebar="sidebar_is_closed = false"
      :sidebar_is_closed="sidebar_is_closed"
    />

    <main
      @click="mobileMainClick"
      class="main"
      :class="{ sidebar_is_closed: sidebar_is_closed }"
    >
      <TheNavbar
        @click.stop
        @toggleSidebar="toggleSidebar"
        :sidebar_is_closed="sidebar_is_closed"
      />

      <div class="insideHomeView pb-10">
        <div class="wrapper">
          <div class="breadcrump">
            <Breadcrumb
              v-if="useGlobalStore().breedcrumbItems?.length > 0"
              :items="useGlobalStore().breedcrumbItems"
            />
          </div>
          <slot />
        </div>
      </div>

      <!-- <TheFooter /> -->
    </main>

    <LowerNav />
  </div>
</template>

<script setup>
import { useGlobalStore } from "@/stores/global";
import { useAuthStore } from "@/stores/auth";

const sidebar_is_closed = ref(false);
const toggleSidebar = () => {
  sidebar_is_closed.value = !sidebar_is_closed.value;
};

const mobileMainClick = () => {
  if (useHelpers().isSmallScreen()) {
    sidebar_is_closed.value = true;
  }
};
</script>

<style lang="scss" scoped>
.default_layout {
  .main {
    width: calc(100% - var(--sidebar_width));
    margin-inline-start: auto;
    transition: var(--layout_transition);

    &.sidebar_is_closed {
      width: calc(100% - var(--sidebar_close_width));
    }

    .insideHomeView {
      background: var(--body_bg);
      min-height: calc(100vh);
      padding-top: calc(var(--header_height));

      .wrapper {
        padding-inline: var(--layout_inline_padding);
        padding-block: var(--layout_block_padding);
      }
    }
  }
}
</style>
