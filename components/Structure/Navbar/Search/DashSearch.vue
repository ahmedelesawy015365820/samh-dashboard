<template>
  <div class="search">
    <base-input
      v-if="!useHelpers().isSmallScreen()"
      v-model="keyword"
      :placeholder="$t('navbar.search')"
      hide-details
      class="mb-0"
    >
      <template #prependInner>
        <span class="me-2 ms-5"><Icon name="iconamoon:search-thin" /></span>
      </template>
    </base-input>

    <base-button
      v-else
      class="animate_dark_filled circle"
      style="width: 40px; height: 40px"
      @click="show = !show"
    >
      <Icon name="ph:magnifying-glass-thin" />
    </base-button>
  </div>
</template>

<script setup>
const keyword = ref(null);
</script>

<style lang="scss">
.search {
  margin-inline: 10px;

  span {
    margin-top: -3px;
  }

  .v-field {
    background: var(--search_input_bg) !important;
    border: none !important;
    border-radius: 30px !important;
    height: 50px !important;
  }
}
</style>
