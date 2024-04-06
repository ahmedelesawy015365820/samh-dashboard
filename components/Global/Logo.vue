<template>
  <NuxtLink class="logo" to="/" name="Home Page Logo">
    <nuxt-img
      :key="useHelpers().dir()"
      v-bind="$attrs"
      preset="default"
      :src="logo"
      alt="App Logo"
      :width="width"
      :height="height"
  /></NuxtLink>
</template>

<script setup>
import { useThemeStore } from "@/stores/theme";
import { useLangStore } from "@/stores/lang";
// const { current_theme } = useThemeStore();
// const { current_lang } = useLangStore();

const props = defineProps([
  "big",
  "fixed_src",
  "fixed_theme",
  "fixed_lang",
  "header_nav",
  "header_nav_mobile",
  "stiky",
  "mobile",
  "width",
  "height",
]);

const width = computed(() => {
  if (props.width) return props.width;
  if (props.big) return "200";
  if (props.mobile) return "35";
  else return "125";
});
const height = computed(() => {
  if (props.height) return props.height;
  if (props.big) return "100";
  if (props.mobile) return "35";
  else return "56";
});

const logo = computed(() => {
  if (props.fixed_src) return props.fixed_src;
  if (props.mobile || props.header_nav_mobile) {
    return `/images/Logo/mobile.png`;
  }
  if (props.fixed_theme) {
    if (useLangStore().current_lang == "ar") {
      if (props.big) return `/images/Logo/ar_logo_${props.fixed_theme}_big.png`;
      return `/images/Logo/ar_logo_${props.fixed_theme}.png`;
    } else {
      if (props.big) return `/images/Logo/en_logo_${props.fixed_theme}_big.png`;
      return `/images/Logo/en_logo_${props.fixed_theme}.png`;
    }
  }
  if (props.fixed_lang) {
    if (useThemeStore().current_theme == "dark") {
      if (props.big)
        return `/images/Logo/${props.fixed_lang}_logo_dark_big.png`;
      return `/images/Logo/${props.fixed_lang}_logo_light.png`;
    } else {
      if (props.big)
        return `/images/Logo/${props.fixed_lang}_logo_light_big.png`;
      return `/images/Logo/${props.fixed_lang}_logo_dark.png`;
    }
  }

  if (useLangStore().current_lang == "ar") {
    if (props.stiky && props.header_nav) {
      return "/images/Logo/ar_logo_dark.png";
    }
    if (!props.stiky && props.header_nav) {
      return "/images/Logo/ar_logo_light.png";
    }

    if (useThemeStore().current_theme == "dark") {
      return "/images/Logo/ar_logo_light.png";
    } else {
      return "/images/Logo/ar_logo_dark.png";
    }
  } else {
    if (props.stiky && props.header_nav) {
      return "/images/Logo/en_logo_dark.png";
    }
    if (!props.stiky && props.header_nav) {
      return "/images/Logo/en_logo_light.png";
    }

    if (useThemeStore().current_theme == "dark") {
      return "/images/Logo/en_logo_light.png";
    } else {
      return "/images/Logo/en_logo_dark.png";
    }
  }
});

onMounted(() => {});
</script>

<style lang="scss" scoped>
a {
  display: block;

  img {
    display: block;
  }
}
</style>
