<template>
  <div class="user" @click.stop="show = !show">
    <!-- <header class="header d-flex align-center"> -->
    <nuxt-link to="/profile">
      <nuxt-img
        class="rounded-circle image me-2"
        preset="default"
        width="60"
        height="60"
        :src="user?.image || 'images/avatars/nav.jpg'"
      ></nuxt-img>
    </nuxt-link>
    <!-- <div
      v-if="!useHelpers().isSmallScreen() && !dash_nav"
      class="txt d-flex align-center"
    >
      {{ user.first_name_ar + " " + user.second_name_ar }}
      <span class="arrow"><Icon name="ic:outline-keyboard-arrow-down" /></span>
    </div> -->
    <!-- </header> -->

    <!-- <NavDropdown
      :show="show"
      @close="show = false"
      position="left"
      width="240px"
    >
      <div class="dropdown">
        <div class="header d-flex align-center ga-2 px-4">
          <nuxt-link class="image" to="/">
            <nuxt-img
              class="rounded-circle d-block"
              preset="default"
              width="50"
              height="50"
              :src="user.image || 'images/avatars/nav.jpg'"
            ></nuxt-img>
          </nuxt-link>

          <div class="txt">
            <span>
              {{ user.first_name_ar + " " + user.second_name_ar }}
            </span>
            <a class="para" :href="`mailto:${user.email}`">{{ user.email }}</a>
          </div>
        </div>

        <ul>
          <nuxt-link to="/dashboard">
            <li>
              <span class="icon"
                ><Icon size="20" name="material-symbols:settings-outline"
              /></span>
              <span class="title">{{ $t("navbar.user.settings") }}</span>
            </li>
          </nuxt-link>
          <nuxt-link to="/">
            <li>
              <span class="icon"
                ><Icon size="20" name="lets-icons:horizontal-switch"
              /></span>
              <span class="title">{{ $t("navbar.user.agency") }}</span>
            </li>
          </nuxt-link>
           <li class="switch_lang" @click="lang_store.switchLang()">
            <span class="icon"
              ><Icon size="17" name="mingcute:globe-fill"
            /></span>
            <span class="title">{{ useHelpers().lang() }}</span>
          </li> 
          <li class="logout" @click="auth_store.logOut()">
            <span class="icon"
              ><Icon size="17" name="octicon:sign-out-16"
            /></span>
            <span class="title">{{ $t("navbar.user.logout") }}</span>
          </li>
        </ul>
      </div>
    </NavDropdown> -->
  </div>
</template>

<script setup>
const props = defineProps({
  dash_nav: {
    type: Boolean,
    required: false,
    default: false,
  },
});

import { useAuthStore } from "@/stores/auth";
const auth_store = useAuthStore();
const lang_store = useLangStore();
const user = auth_store.user;

const show = ref(false);
</script>

<style lang="scss" scoped>
.user {
  position: relative;
  width: 60px;
  height: 60px;

  .header {
    font-family: "Noto Kufi Arabic Variable", sans-serif;
  }

  @media (max-width: 800px) {
    position: unset;
  }

  header {
    cursor: pointer;

    img {
      cursor: pointer;
      position: relative;
    }

    .txt {
      .arrow {
        display: block;
        margin-top: 4px;
      }
    }
  }

  .dropdown {
    .header {
      padding: 10px;
      border-bottom: 1px solid #f2f4f7;

      .image {
        position: relative;
        img {
          cursor: pointer;
        }

        &::before {
          content: "";
          width: 15px;
          height: 15px;
          border-radius: 50%;
          position: absolute;
          bottom: -2px;
          right: -1px;
          background-color: #12b76a;
          border: 2px solid var(--main_bg);
        }
      }

      .txt {
        display: flex;
        flex-direction: column;

        span {
          font-weight: 600;
          font-size: 16px;
        }

        a {
          font-size: 14px;
          color: var(--para);
        }
      }
    }

    ul {
      margin-top: 10px;
      li {
        padding: 10px;
        display: flex;
        gap: 10px;
        transition: all 0.3s ease-in-out;
        cursor: pointer;

        &:hover {
          background: #f2f4f7;
        }

        span.icon {
          width: 30px;
          height: 30px;
          background: #eaa1211a;
          border-radius: 50%;
          color: var(--primary);
          display: flex;
          justify-content: center;
          align-items: center;
        }

        span.title {
          font-size: 14px;
          margin-top: 2px;
        }

        &.switch_lang {
          border-top: 1px solid #f2f4f7;
          justify-content: center;
        }
        &.logout {
          border-top: 1px solid #f2f4f7;

          span.icon {
            background: #f91e1e1a;
            color: red;
          }

          .title {
            color: red;
            font-weight: 600;
          }
        }
      }
    }
  }
}
</style>
