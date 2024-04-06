<template>
  <div clas="error-page">
    <main class="main">
      <div class="wrapper">
        <NuxtImg
          preset="default"
          width="300"
          height="300"
          :src="imgSrc"
          :alt="error?.statusCode + ' error'"
        />

        <h1>{{ title }}</h1>
        <p>
          {{ errorDescription }}
        </p>

        <base-button
          class="animate_primary_filled error_page mt-3"
          @click="handleError"
          >{{ btn }}</base-button
        >
      </div>
    </main>
  </div>
</template>

<script setup>
const props = defineProps({
  error: {
    required: true,
    type: Object,
  },
});

const handleError = () => {
  clearError();
  window.location.href = "/"; // redirect to home
};

const imgSrc = computed(() => {
  if (props.error.statusCode == 404) {
    return `/images/errors/404.png`;
  } else if (props.error.statusCode == 500) {
    return `/images/errors/500.png`;
  } else {
    return `/images/errors/no_internet.png`;
  }
});

const { $i18n: locele } = useNuxtApp();

const title = computed(() => {
  if (props.error.statusCode == 404)
    return locele.t("pages.error.notFound.title");
  if (props.error.statusCode == 500)
    return locele.t("pages.error.serverErr.title");
  else return locele.t("pages.error.else.title");
});

const errorDescription = computed(() => {
  if (props.error.statusCode == 404)
    return locele.t("pages.error.notFound.desc");
  if (props.error.statusCode == 500)
    return locele.t("pages.error.serverErr.desc");
  else return locele.t("pages.error.else.desc");
});

const btn = computed(() => {
  if (props.error.statusCode == 404)
    return locele.t("pages.error.notFound.btn");
  if (props.error.statusCode == 500)
    return locele.t("pages.error.serverErr.btn");
  else return locele.t("pages.error.else.btn");
});
</script>

<style scoped lang="scss">
.main {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;

  .wrapper {
    display: flex;
    align-items: center;
    flex-direction: column;
    text-align: center;

    h1 {
      font-size: 45px;
      font-weight: 600;
    }

    p {
      font-size: 18px;
      color: var(--para);
      margin-bottom: 20px;
      @media (min-width: 600px) {
        width: 400px;
      }
    }
  }
}
</style>
