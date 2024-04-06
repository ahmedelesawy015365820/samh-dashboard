<template>
  <div class="home_card">
    <h6 class="h_6">{{ useHelpers().capitalizeEveryWord(title) }}</h6>
    <h3 class="h_3">{{ number }}</h3>
    <p class="para">
      {{ desc }}
    </p>
    <div class="circle_icon">
      <Icon :name="icon" />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  number: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
.home_card {
  padding: 15px;
  background: var(--card_bg);
  color: var(--main_txt);
  position: relative;
  border-radius: 15px;
  transition: all 0.2s linear;

  &:hover {
    transform: translateY(-5px);
  }

  h6 {
    color: gray;
  }

  .circle_icon {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: var(--home_card_icon_bg_color);
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px 0;
    position: absolute;
    top: 15px;
    right: 15px;

    svg {
      width: 25px;
      height: 25px;
      color: var(--home_card_icon_color);
    }
  }

  .para {
    font-size: 14px;
  }
}

body.rtl {
  .home_card {
    .circle_icon {
      right: unset;
      left: 15px;
    }
  }
}
</style>
