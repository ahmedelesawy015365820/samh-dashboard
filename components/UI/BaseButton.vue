<template>
  <button
    v-if="!props.to"
    class="base_button"
    aria-label="forget to set it"
    v-bind:="$attrs"
    :class="{
      disabled: props.disabled || props.loading,
      loading: props.loading,
    }"
  >
    <span v-if="props.loading" class="btn_loader"></span>
    <span class="d-flex align-center ga-1"><slot></slot></span>
  </button>

  <NuxtLink
    v-else
    class="base_button"
    aria-label="forget to set it"
    v-bind:="$attrs"
    :to="props.to"
    name="Profile Page"
  >
    <span class="d-flex align-center ga-1"><slot /></span>
  </NuxtLink>
</template>

<script setup>
const props = defineProps({
  to: {
    type: String,
    required: false,
  },
  loading: {
    type: Boolean,
    required: false,
    default: false,
  },
  disabled: {
    type: Boolean,
    required: false,
    default: false,
  },
});
</script>

<style lang="scss">
@keyframes rotation {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}

body {
  button.base_button,
  a.base_button {
    position: relative;
    text-decoration: none;
    font-size: 16px;
    font-weight: 500;
    transition: all 0.2s linear;
    font-family: inherit;
    cursor: pointer;
    overflow: hidden;
    padding: 7px 10px;

    display: flex;
    justify-content: center;
    align-items: center;

    background: var(--primary);
    border: 1px solid var(--primary);
    color: #fff;
    border-radius: 8px;
    width: fit-content;

    & > * {
      position: relative;
      z-index: 3;
    }

    svg.icon {
      color: inherit !important;
      height: fit-content;
      margin-top: 2px;
    }

    .btn_loader {
      position: absolute;
      top: 25%;
      left: 10px;
      width: 20px;
      height: 20px;
      border: 3px dotted var(--main);
      border-style: solid solid dotted dotted;
      border-radius: 50%;
      transition: all 0.6s ease-in-out;
      display: block;
      animation: rotation 1.5s linear infinite;
    }

    &.wide {
      padding: 4px 50px;
      font-size: 20px;
      font-weight: 400;
    }

    &.profile {
      width: 161px;
      height: 42px;
      font-size: 16px;
      font-weight: bold;
    }

    &.filter_property {
      font-size: 16px;
      padding: 7px 20px;
    }

    &.dash {
      width: 164px;
      height: 42px;
      font-size: 20px;
    }

    &.error_page {
      width: 350px;
      height: 40px;
      font-size: 20px;
      font-weight: 600;
      text-align: center;
    }

    &.auth {
      width: 150px;
      height: 40px;
      font-size: 20px;
      font-weight: 600;
      text-align: center;
    }

    &.navbar {
      width: 150px;
      height: 50px;

      font-size: 15px;
      font-weight: 600;
    }

    &.pagination {
      width: 120px;
      height: 39px;

      &.prev {
        border: 1px solid var(--border);
        color: var(--secondary_txt);
        background: var(--main_bg);

        &:hover {
          color: #fff;
          background: var(--secondary);
          border-color: var(--secondary);
        }
      }
    }

    &.fixed {
      width: 163px;
      height: 42px;
    }

    &.md {
      width: 155px;
      height: 45px;
    }

    &.lg {
      width: 165px;
      height: 50px;
    }

    &.xl {
      width: 180px;
      height: 70px;
    }

    &.disabled {
      pointer-events: none !important;
      color: #fff !important;
      border-color: gray !important;
      background: gray !important;

      &:before,
      &:after {
        display: none !important;
      }
    }

    &.flat {
      border: none;
      background: transparent;
      border: 1px solid transparent;
      color: var(--main_txt);
      width: fit-content;

      &:hover {
        color: var(--primary) !important;
      }

      &._colored {
        color: var(--primary) !important;
      }

      &.underline {
        text-decoration: underline;
      }
    }

    &.block_center {
      margin: 0 auto;
    }

    &.outlined {
      border: 1px solid var(--main_txt);
      background: transparent;
      color: var(--main_txt);

      &:hover {
        color: #fff;
        border-color: var(--primary);
        background: var(--primary);
      }
    }

    &.danger {
      border-color: #ff0000;
      color: #ff0000;
      background: transparent;

      &:hover {
        color: #fff;
        border-color: #ff0000;
        background: #ff0000;
      }
    }

    &.white {
      border-color: var(--main_txt);
      color: var(--main_txt);
      background: transparent;

      // &:hover {
      //   color: #fff;
      //   border-color: var(--secondary);
      //   background: var(--secondary);
      // }
    }

    &.circle {
      border-radius: 50%;
      width: 45px;
      height: 45px;

      &.sm {
        width: 35px;
        height: 35px;

        svg.icon {
          font-size: 18px;
        }
      }
    }

    &:before,
    &:after {
      content: "";
      position: absolute;
    }

    &:before {
      height: 100%;
      right: -100%;
      top: 0;
      width: 0;
      z-index: 2;
      transform: skew(-50deg);
      transition: width 0.6s;
      transform-origin: top right;
    }
    &:after {
      width: 100%;
      height: 100%;
      inset: 0;
      z-index: 1;
      opacity: 0;
      transition: opacity 0.6s;
    }

    &.animate_dark_filled {
      border-color: var(--secondary);
      background-color: var(--secondary);
      color: #fff;

      &:before {
        background-color: var(--secondary);
      }
      &::after {
        background-color: var(--secondary_2);
      }

      &:hover {
        color: #fff;
        &:before {
          height: 100%;
          width: 200%;
        }
        &:after {
          opacity: 1;
        }
      }
    }
    &.animate_primary_filled {
      border-color: var(--primary);
      background-color: var(--primary);
      color: #fff;

      &:before {
        background-color: var(--primary_2);
      }
      &::after {
        background-color: var(--primary);
      }

      &:hover {
        color: #fff;
        &:before {
          height: 100%;
          width: 200%;
        }
        &:after {
          opacity: 1;
        }
      }
    }
    &.animate_dark {
      border: 1px solid var(--secondary);
      background-color: transparent;
      color: var(--secondary);

      &.wihte {
        color: #fff;
        border-color: #fff;
      }

      &:before {
        background-color: var(--secondary);
      }
      &::after {
        background-color: var(--secondary_2);
      }

      &:hover {
        color: #fff;
        border-color: var(--secondary);
        a {
          color: #fff;
        }
        &:before {
          height: 100%;
          width: 200%;
        }
        &:after {
          opacity: 1;
        }
      }
    }
    &.animate_primary {
      border: 1px solid var(--primary);
      background-color: transparent;
      color: var(--primary);

      &:before {
        background-color: var(--primary);
      }
      &::after {
        background-color: var(--primary_2);
      }

      &:hover {
        color: #fff;
        a {
          color: #fff;
        }
        &:before {
          height: 100%;
          width: 200%;
        }
        &:after {
          opacity: 1;
        }
      }
    }
  }
}
</style>
