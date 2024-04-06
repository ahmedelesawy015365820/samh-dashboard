<template>
  <div class="add_edit_form">
    <v-form ref="form" @submit.prevent="submit">
      <main class="inputs">
        <v-row>
          <v-col cols="12">
            <uplode-image
              v-model="data.profile_image"
              :title="$t('labels.profile_image')"
              required
            />
          </v-col>

          <!-- Social Icons + url -->
          <v-col cols="12" align="center">
            <v-row>

              <v-col cols="12" md="6">
                <base-input
                    v-model="data.first_name_ar"
                    :label="$t('labels.first_name') + $t('labels.ar')"
                    required
                ></base-input>
              </v-col>
              <v-col cols="12" md="6">
                <base-input
                    v-model="data.last_name_ar"
                    :label="$t('labels.last_name') + $t('labels.ar')"
                    required
                ></base-input>
              </v-col>

              <v-col cols="12" md="6">
                <base-input
                    v-model="data.first_name_en"
                    :label="$t('labels.first_name') + $t('labels.en')"
                    required
                ></base-input>
              </v-col>
              <v-col cols="12" md="6">
                <base-input
                    v-model="data.last_name_en"
                    :label="$t('labels.last_name') + $t('labels.en')"
                    required
                ></base-input>
              </v-col>

              <v-col cols="12" md="6">
                <base-input
                    v-model="data.email"
                    :label="$t('labels.email')"
                    required
                ></base-input>
              </v-col>
              <v-col cols="12" md="6">
                <base-input
                    v-model="data.phone_number"
                    :label="$t('labels.phone_number')"
                    required
                ></base-input>
              </v-col>

              <v-col cols="12" md="6">
                <base-input
                    v-model="data.ssn_id"
                    :label="$t('labels.ssn_id')"
                    required
                ></base-input>
              </v-col>

            </v-row>
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
  profile_image: '',
  first_name_ar: "",
  last_name_ar: "",
  first_name_en: "",
  last_name_en: "",
  phone_number: "",
  email: "",
  ssn_id: "",
  roles: [],
  status: null,
  gender: null
});

const loading = ref(false);
const form = ref("form");
const submit = () => {
  loading.value = true;
  const { valid } = form.value.validate();
  if (!valid) return;

  loading.value = false;
};
</script>

<style lang="scss" scoped></style>
