<template>
  <div
    class="language"
    @click.stop="toggleShow"
    :class="{ stikyNav: stikyNav, auth: auth }"
  >
    <div class="lang_text">
      <span class="globe"
        ><Icon :size="auth ? 22 : 20" name="ph:globe-light"
      /></span>
      <span class="text">{{ langText }}</span>
      <span class="arrow"
        ><Icon size="15" name="zondicons:cheveron-down"
      /></span>
    </div>

    <NavDropdown
      :show="show"
      @close="show = false"
      position="right"
      width="auto"
    >
      <div class="dropdown">
        <ul>
          <li
            v-for="lang in langs"
            :class="{ disabled: useHelpers().lang() == lang }"
            @click="switchLang(true)"
          >
            <span class="title">{{ $t(`languages.${lang}`) }}</span>
          </li>
        </ul>
      </div>
    </NavDropdown>
  </div>
</template>

<script setup>
const props = defineProps({
  stikyNav: Boolean,
  auth: Boolean,
});

const show = ref(false);
const toggleShow = () => {
  show.value = !show.value;
};

import { useLangStore } from "~/stores/lang";
const lang_store = useLangStore();

const langText = computed(() => {
  if (useHelpers().lang() == "en") {
    return "EN";
  } else {
    return "AR";
  }
});

const langs = ["ar", "en"];

const switchLang = (refresh) => {
  lang_store.switchLang(refresh);
};
</script>

<style lang="scss" scoped>
@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.language {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
  }

  .lang_text {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 15px;
    transition: all 0.3s ease-in-out;

    span.text {
      font-size: 14px;
    }

    .globe {
      transform-origin: center center;
      // margin-top: -2px;
    }

    .arrow {
    }

    &:hover {
      .globe {
        animation: rotate 3s ease-in-out infinite alternate;
      }
    }
  }

  .dropdown {
    li {
      padding: 10px 20px;
      transition: all 0.2s linear;
      color: var(--main_txt);

      &:first-child {
        border-bottom: 1px solid var(--border_opacity);
      }

      &:hover {
        background: #f2f4f7;
      }
    }
  }

  &.auth {
    .lang_text {
      color: var(--secondary_text_dark);
      font-size: 20px;
      font-weight: 600;

      .globe {
        animation: none;
        margin-top: -5px;
      }

      .text {
        font-size: 18px;
      }

      .arrow {
        display: none;
      }
    }
  }

  &.nav {
    .lang_text {
      color: #a3aed0;
    }
  }
}

body.rtl {
  .language.auth {
    .lang_text {
      .icon {
        margin-top: 6px !important;
      }
    }
  }
}
</style>
