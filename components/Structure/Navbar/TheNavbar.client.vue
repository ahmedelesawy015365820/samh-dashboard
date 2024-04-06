<template>
  <section class="navs">
    <nav
      class="theNav"
      :class="{
        stikyNav: stikyNav,
        inView: inView,
        sidebar_is_closed: sidebar_is_closed,
        mobile: useHelpers().isSmallScreen(),
      }"
    >
      <div class="wrapper d-flex align-center">
        <div
          class="hamburger-icon me-8"
          @click="emit('toggleSidebar')"
          :class="{ open: sidebar_is_closed }"
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        <DashSearch class="me-lg-5 flex-lg-grow-1" />

        <template v-if="!useHelpers().isSmallScreen()">
          <SwitchLanguage class="mx-5 nav" />
          <div class="settings nav_circle">
            <nuxt-link to="/settings">
              <Icon size="25" name="carbon:settings" />
            </nuxt-link>
          </div>
          <div class="theme nav_circle">
            <SwitchTheme />
          </div>
        </template>

        <div class="notification nav_circle">
          <NotificationMenu />
        </div>

        <UserMenu v-if="useAuthStore().user" class="ms-md-5 ms-auto" />
        <NavAuth v-else />
      </div>
    </nav>
  </section>
</template>

<script setup>
const emit = defineEmits(["toggleSidebar"]);
const props = defineProps({
  sidebar_is_closed: Boolean,
});

const is_header_nav = computed(() => {
  return useRoute().fullPath == "/";
});

import { useAuthStore } from "~/stores/auth";

const stikyNav = ref(false);
const inView = ref(false);

onMounted(() => {
  setTimeout(() => {
    const NAV_HEIGHT = document.querySelector("nav.theNav").clientHeight;

    window.addEventListener("scroll", () => {
      let documentScrollTop = document.documentElement.scrollTop;

      stikyNav.value = documentScrollTop > NAV_HEIGHT - 40;
      inView.value =
        documentScrollTop > NAV_HEIGHT &&
        useHelpers().scrollDirection() == "down";
    });
  }, 10);
});
</script>

<style lang="scss">
.theNav {
  position: fixed;
  top: 0;
  z-index: 999;
  background: transparent;
  background: var(--main_bg);
  height: var(--header_height);
  display: flex;
  align-items: center;
  transition: var(--layout_transition);
  right: var(--sidebar_width);
  left: 0;
  width: calc(100vw - var(--sidebar_width));
  padding-inline: var(--layout_inline_padding);

  .wrapper {
    width: 100%;
  }

  &.sidebar_is_closed {
    right: var(--sidebar_close_width);
    width: calc(100vw - var(--sidebar_close_width));
  }

  &.mobile {
    right: 0 !important;
    left: 0 !important;
    width: 100% !important;
  }

  &.stikyNav {
    top: -200px;
    box-shadow: 0 0 10px var(--shadow);
    background: var(--main_bg);

    .wrapper {
      ul.bigScreen {
        li {
          a {
            color: var(--main_txt);
          }
        }
      }
      .navAuth {
        .base_button {
          color: var(--main_txt);
        }
      }
      .toggleMenu {
        svg.icon {
          color: var(--main_txt);
        }
      }
      .user {
        header {
          .txt {
            color: var(--main_txt);
          }
        }
      }
    }
  }
  &.inView {
    top: 0;
  }
}

body.ltr {
  .theNav {
    left: var(--sidebar_width);
    right: 0;

    &.sidebar_is_closed {
      left: var(--sidebar_close_width);
    }
  }
}
</style>
