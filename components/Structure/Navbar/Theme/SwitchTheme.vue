<template>
  <div class="change_theme">
    <Icon size="25" name="ri:moon-fill"></Icon>
  </div>
</template>

<script setup>
import { useThemeStore } from "~/stores/theme";
const theme_store = useThemeStore();
</script>
