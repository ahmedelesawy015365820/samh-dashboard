<template>
  <div class="language" @click="switchLang">
    <nuxt-img
      preset="default"
      width="26"
      height="26"
      :src="langIcon"
      alt="Switch Lang Image"
    />
  </div>
</template>

<script setup>
import { useLangStore } from "~/stores/lang";
const lang_store = useLangStore();

const langIcon = computed(() => {
  if (useHelpers().lang() == "en") {
    return "/icons/en.png";
  } else {
    return "/icons/ar.png";
  }
});

const langText = computed(() => {
  if (useHelpers().lang() == "en") {
    return "Eng (US)";
  } else {
    return "AR (EG)";
  }
});

const switchLang = () => {
  const refresh = useRoute().fullPath.includes("dashboard/properties/add");
  lang_store.switchLang(refresh);
};
</script>

<style lang="scss" scoped>
.language {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-inline: 80px;
  gap: 11px;
  flex-shrink: 0;

  img {
    flex-shrink: 0;
  }
  .lang_text {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 15px;
    transition: all 0.3s ease-in-out;
    font-weight: 600;

    svg.icon {
      opacity: 0.6;
    }
  }

  @media (max-width: 1200px) {
    margin-inline: 40px;
  }
}
</style>
