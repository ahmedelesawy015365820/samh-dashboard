<template>
  <section
    class="lowerNav"
    :class="{
      inView:
        useHelpers().scrollDirection() == 'down' &&
        useHelpers().isSmallScreen(),
    }"
  >
    <div class="lang nav_circle">
      <DashSwitchLang />
    </div>
    <div class="settings nav_circle">
      <nuxt-link to="/settings">
        <Icon size="25" name="carbon:settings" />
      </nuxt-link>
    </div>
    <div class="theme nav_circle">
      <SwitchTheme />
    </div>
  </section>
</template>

<script setup>
import { useAuthStore } from "~/stores/auth";
</script>

<style lang="scss" scoped>
.lowerNav {
  background: var(--main_bg);
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: 998;
  border-top: 1.5px solid var(--border);
  box-shadow: 0 0 -10px var(--shadow);
  transform: translate(0, 200px);
  transition: all 0.3s ease-in-out;
  padding: 13px 0;

  display: flex;
  align-items: center;
  justify-content: space-around;

  &.inView {
    transform: translate(0, 0);
  }
}
</style>
