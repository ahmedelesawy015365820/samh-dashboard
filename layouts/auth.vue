<template>
  <div class="auth_layout">
    <v-row>
      <v-col cols="12" md="5" class="px-0">
        <main class="main">
          <div class="fixed_lang">
            <SwitchLanguage auth />
          </div>
          <div class="fixed_back_button d-flex d-md-none">
            <nuxt-link to="/"
              ><Icon name="material-symbols:arrow-left-alt"
            /></nuxt-link>
          </div>
          <div class="wrapper">
            <slot />
          </div>
        </main>
      </v-col>
      <v-col cols="12" md="7" class="px-0 d-none d-md-block">
        <div class="bg">
          <Logo fixed_theme="light" :big="true" />
          <div class="fixed_img">
            <NuxtImg preset="default" src="/images/bg/login.svg" />
          </div>
          <div class="fixed_back_button">
            <nuxt-link to="/"
              ><Icon name="material-symbols:arrow-left-alt"
            /></nuxt-link>
          </div>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<style lang="scss">
.auth_layout {
  height: 100vh;
  max-height: 100vh;
  background-color: var(--main_bg);
  overflow: hidden;

  .fixed_back_button {
    position: absolute;
    top: 40px;
    right: 40px; // RTL
    transform: rotate(180deg);

    a {
      color: #fff;
      border: 3px solid #fff;
      width: 40px;
      height: 40px;
      cursor: pointer;
      @include flex_center;
      transition: all 0.3s ease;
      border-radius: 50%;
    }

    &:hover {
      a {
        background-color: #fff;
        color: var(--secondary);
      }
    }

    @media (max-width: 960px) {
      top: 20px;
      a {
        color: var(--secondary_text_dark);
        border-color: var(--secondary_text_dark);
      }
      &:hover {
        a {
          background-color: var(--secondary_text_dark);
          color: #fff;
        }
      }
    }
  }

  .bg {
    height: 100vh;
    position: relative;
    background: linear-gradient(180deg, #32578e 0%, var(--secondary) 100%);
    @include flex_center;

    .logo {
      margin-top: -20vh;
    }

    .fixed_img {
      position: absolute;
      bottom: -33px;
      left: 0; // RTL

      img {
        height: 53vh;
      }
    }
  }

  main.main {
    height: 100vh;
    @include flex_center;

    .wrapper {
      width: 60%;
    }

    .fixed_lang {
      position: absolute;
      top: 40px;
      left: 40px; // RTL
    }

    @media (max-width: 1200px) {
      .wrapper {
        width: 75%;
      }
    }

    @media (max-width: 960px) {
      .wrapper {
        width: 80%;
      }

      .fixed_lang {
        top: 20px;
      }
    }

    @media (max-width: 768px) {
      .wrapper {
        width: 90%;
      }
    }
  }
}

body.rtl {
  .auth_layout {
    .fixed_back_button {
      right: auto;
      left: 40px;
      transform: rotate(0deg);
    }

    .bg {
      .fixed_img {
        left: auto;
        right: -120px;

        img {
          transform: rotateY(180deg);
        }
      }
    }

    main.main {
      .fixed_lang {
        left: auto;
        right: 40px;
      }
    }
  }
}
</style>
