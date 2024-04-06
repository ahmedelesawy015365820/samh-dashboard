<template>
  <transition name="fadeInUp">
    <div class="nav_dropDown" v-if="show" :class="[position]">
      <main :style="{ 'min-width': width }">
        <slot></slot>
      </main>
    </div>
  </transition>
</template>

<script setup>
const props = defineProps({
  show: Boolean,
  position: {
    type: String,
    default: "right",
  },
  width: {
    type: String,
    default: "300px",
  },
});
const emits = defineEmits(["close"]);

onMounted(() => {
  window.addEventListener("click", () => {
    emits("close");
  });
});
</script>

<style lang="scss">
.nav_dropDown {
  position: absolute;
  z-index: 999;
  top: 120%;
  border-radius: 5px;
  background: var(--main_bg);
  box-shadow: 0px 10px 40px var(--shadow);

  &.right {
    right: 0;
  }
  &.left {
    left: 0;
  }

  main {
    min-height: 10vh;
  }

  @media (max-width: 500px) {
    width: 95%;
    right: 50% !important;
    transform: translateX(50%);
    top: 110%;

    main {
      & > * {
        width: 100% !important;
      }
    }
  }
}

body.ltr {
  .nav_dropDown {
    &.right {
      right: unset;
      left: 0;
    }
    &.left {
      left: unset;
      right: 0;
    }
  }
}
</style>
