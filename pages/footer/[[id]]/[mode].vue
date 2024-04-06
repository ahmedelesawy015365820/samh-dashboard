<template>
  <div class="add_edit_form">
    <v-form ref="form" @submit.prevent="submit">
      <main class="inputs">
        <v-row>
          <v-col cols="12">
            <uplode-image
              v-model="data.image"
              :title="$t('labels.image')"
              required
            />
          </v-col>

          <!-- Social Icons + url -->
          <v-col cols="12">
            <v-row>
              <v-col
                cols="12"
                v-for="(social, index) in data.socials"
                :key="index"
              >
                <v-row align="center">
                  <v-col cols="12" md="5">
                    <base-input
                      v-model="social.icon"
                      :label="$t('labels.icon')"
                      required
                    ></base-input>
                  </v-col>
                  <v-col cols="12" md="5">
                    <base-input
                      v-model="social.url"
                      :label="$t('labels.url')"
                      required
                    ></base-input>
                  </v-col>
                  <v-col cols="12" md="2">
                    <base-button
                      class="animate_primary_filled circle"
                      type="button"
                      color="primary"
                      @click="data.socials.push({ icon: '', url: '' })"
                    >
                      <Icon name="material-symbols:add" />
                    </base-button>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-col>

          <v-col cols="12">
            <v-switch
              v-model="data.is_active"
              :label="$t('labels.is_active')"
              color="primary"
              required
            ></v-switch>
          </v-col>
        </v-row>
      </main>
      <footer class="footer d-flex justify-space-between">
        <base-button
          class="animate_primary_filled lg"
          type="submit"
          color="primary"
          :loading="loading"
        >
          {{ mode === "add" ? $t("labels.add") : $t("labels.edit") }}
        </base-button>
      </footer>
    </v-form>
  </div>
</template>

<script setup>
definePageMeta({
  requireAuth: true,
});

const route = useRoute();
const id = route.params.id;
const mode = route.params.mode;

const data = ref({
  image: "",
  is_active: false,
  socials: [
    {
      icon: "",
      url: "",
    },
  ],
});

const loading = ref(false);
const form = ref("form");
const submit = () => {
  loading.value = true;
  const { valid } = form.value.validate();
  if (!valid) return;
};
</script>

<style lang="scss" scoped></style>
