<template>
  <header class="modalHeader">
    <h4 class="h_4">{{ title }}</h4>
    <span @click="$emit('close')" class="close"
      ><Icon size="30" name="mdi:close-octagon-outline"
    /></span>
  </header>
</template>

<script setup>
const emits = defineEmits(["close"]);
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
.modalHeader {
  display: flex;
  justify-content: space-between;
  padding: 20px 0 5px;
  border-bottom: 3px solid var(--border_opacity);
  width: 90%;
  margin: 0 auto 20px;

  h4 {
    color: var(--secondary_text_dark);
    font-weight: 600;
  }

  .close {
    cursor: pointer;

    svg.icon {
      color: #f00 !important;
    }
  }
}
</style>
