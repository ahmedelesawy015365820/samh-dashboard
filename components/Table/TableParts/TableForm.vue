<template>
  <div class="card">
    <ModalHeader @close="emits('close')" :title="title" />

    <div class="wrapper">
      <main>
        <v-row>
          <v-col
            v-for="filed in inputs"
            :key="filed.id"
            :cols="filed.col ? filed.col : '12'"
          >
            <template v-if="filed.type == 'switch'">
              <div class="custom_input table_form">
                <v-switch
                  v-model="filed.val"
                  :label="filed.label"
                  :rules="filed.rules ? filed.rules : []"
                  :required="filed.required"
                  hide-details
                  color="primary"
                ></v-switch>
              </div>
            </template>

            <template v-else-if="filed.type == 'select'">
              <select-input
                class="table_form"
                v-model="filed.val"
                :label="filed.label"
                :placeholder="filed.label"
                :rules="filed.rules ? filed.rules : []"
                :required="filed.required"
                :getUrl="filed.getUrl ? filed.getUrl : false"
                :staticItems="filed.staticItems ? filed.staticItems : []"
                :multiple="filed.multiple"
                chips
                crud
                up_mode
              ></select-input>
            </template>

            <template v-else-if="filed.type == 'image'">
              <uplode-image
                v-model="filed.val"
                :data_src="filed.val"
                :title="filed.label"
                :required="filed.required"
              ></uplode-image>
            </template>

            <template v-else>
              <base-input
                class="table_form"
                v-model="filed.val"
                :label="filed.label"
                :placeholder="filed.placeholder"
                :rules="filed.rules ? filed.rules : []"
                :required="filed.required"
                crud
                up_mode
              ></base-input>
            </template>
          </v-col>
        </v-row>
      </main>

      <footer class="my-5">
        <base-button type="submit" class="animate_primary_filled w-100">
          {{ $t("form.save") }}
        </base-button>
      </footer>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(["inputs", "title", "mode"]);
const emits = defineEmits(["close"]);
</script>

<style lang="scss" scoped>
.card {
  background: var(--main_bg);
  border-radius: 15px;

  .wrapper {
    width: 90%;
    margin-inline: auto;
  }
  .row > div,
  .v-row > div {
    padding-block: 3px;
  }
}
</style>
