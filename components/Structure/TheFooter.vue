<template>
  <footer class="theFooter">
    <h5 class="h_5 mb-0">
      {{ $t("footer.title") + " " + $t("footer.samh") }}
    </h5>
    <h5 class="h_5 mb-0">
      {{ new Date().getFullYear() }} © {{ $t("app.title") }}
    </h5>
  </footer>
</template>

<style lang="scss" scoped>
.theFooter {
  padding-inline: var(--layout_inline_padding);
  display: flex;
  justify-content: space-between;
  padding-block: 15px;

  .h_5 {
    color: var(--footer_txt);
    font-size: 14px;
  }
}
</style>
