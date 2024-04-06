<template>
  <div class="homePage">
    <!-- <v-row>
      <v-col cols="12" md="3" sm="6">
        <HomeCard
          title="users"
          number="25K"
          icon="uil:users-alt"
          desc="Lorem ipsum dolor sit amet consectetur"
        />
      </v-col>
      <v-col cols="12" md="3" sm="6">
        <HomeCard
          title="sessions"
          number="15K"
          icon="ion:analytics-outline"
          desc="Lorem ipsum dolor sit amet consectetur"
        />
      </v-col>
      <v-col cols="12" md="3" sm="6">
        <HomeCard
          title="properties"
          number="25K"
          icon="material-symbols:location-city"
          desc="Lorem ipsum dolor sit amet consectetur"
        />
      </v-col>
      <v-col cols="12" md="3" sm="6">
        <HomeCard
          title="licenses"
          number="1K"
          icon="material-symbols:list-alt"
          desc="Lorem ipsum dolor sit amet consectetur"
        />
      </v-col>
    </v-row> -->
  </div>
</template>

<script setup>
useSeoMeta({
  title: useNuxtApp().$i18n.t("pages.home.title"),
});
definePageMeta({
  requireAuth: true,
});

// ===== Breedcrumb
import { useGlobalStore } from "@/stores/global";
useGlobalStore().breedcrumbItems = [
  {
    text: useNuxtApp().$i18n.t("breedcrumb.home"),
    active: true,
  },
];

onMounted(() => {
  setTimeout(() => {
    useGlobalStore().init_tooltip(false);
  }, 500);
});
</script>

<style scoped lang="scss">
.homeSection {
  padding-block: 100px;
}
</style>
