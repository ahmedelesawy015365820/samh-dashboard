<template>
  <div class="card">
    <ModalHeader @close="emits('close')" :title="title" />

    <div class="wrapper">
      <main>
        <v-row class="mt-7">
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

            <template v-else-if="filed.type == 'radio'">
              <v-row class="justify-center">
                <v-col :cols="filed.col ? filed.col : '10'">
                  <v-radio-group inline v-model="filed.val" :required="filed.required" class="text-center">
                    <v-radio
                        :key="item.id" v-for="(item,key) in filed.options"
                        :value="item.value" :class="filed.val == item.value?'type-radio':''"
                    >
                      <template v-slot:label>
                        <div><strong>{{ item.label }}</strong></div>
                      </template>
                    </v-radio>
                  </v-radio-group>
                </v-col>
              </v-row>
            </template>

          </v-col>
        </v-row>
      </main>

      <footer class="mb-5 mt-3">
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
.type-radio {
  color: var(--primary);
  opacity: unset;
}
.no-type-radio {
  opacity: 0.6;
}
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
