<template>
  <!-- =========== Text && Number && Email =========== -->
  <div
    v-bind:="$attrs"
    class="custom_input"
    v-if="
      type == 'text' ||
      type == 'tel' ||
      type == 'email' ||
      type == 'number' ||
      type == 'url' ||
      type == 'date'
    "
  >
    <label v-if="label && up_mode"
      ><span class="text">{{ label }}</span>
      <span class="asterisk" :title="$t('validation.required')">
        <Icon
          v-if="required"
          size="7"
          color="#db0000"
          name="mdi:asterisk" /></span
    ></label>
    <v-text-field
      variant="solo"
      density="compact"
      :aria-label="`input ${type}`"
      :name="`input ${type + Math.random()}`"
      v-bind:="$attrs"
      :type="type"
      :class="[type]"
      :rules="allRules"
      :label="_label"
      :required="required"
      @click:clear="clearValue"
      @input="updateValue"
      v-model="_modelValue"
    >
      <template v-slot:append-inner>
        <slot name="appendInner"></slot>
      </template>

      <template v-slot:prepend-inner>
        <slot name="prependInner"></slot>
      </template>
    </v-text-field>
  </div>

  <!-- =========== Textarea =========== -->
  <div
    v-bind:="$attrs"
    class="custom_input textarea"
    v-else-if="type == 'textarea'"
  >
    <label v-if="label && up_mode"
      ><span class="text">{{ label }}</span>
      <span class="asterisk" :title="$t('validation.required')">
        <Icon
          v-if="required"
          size="7"
          color="#db0000"
          name="mdi:asterisk" /></span
    ></label>

    <v-textarea
      variant="solo"
      density="compact"
      v-bind:="$attrs"
      class="custom_input"
      :class="[type]"
      :rules="allRules"
      :label="_label"
      @input="updateValue"
      @click:clear="clearValue"
      :required="required"
      :aria-label="`input ${type}`"
      :name="`input ${type}`"
      v-model="_modelValue"
    >
      <template v-slot:append-inner>
        <div :title="$t('validation.required')">
          <Icon v-if="required" size="7" color="#db0000" name="mdi:asterisk" />
        </div>

        <slot name="appendInner"></slot>
      </template>

      <template v-slot:prepend-inner>
        <slot name="prependInner"></slot>
      </template>
    </v-textarea>
  </div>

  <!-- =========== Password =========== -->
  <div v-bind:="$attrs" class="custom_input" v-else-if="type == 'password'">
    <label v-if="label && up_mode"
      ><span class="text">{{ label }}</span>
      <span class="asterisk" :title="$t('validation.required')">
        <Icon
          v-if="required"
          size="7"
          color="#db0000"
          name="mdi:asterisk" /></span
    ></label>

    <v-text-field
      autocomplete="new-password"
      variant="solo"
      density="compact"
      v-bind:="$attrs"
      class="custom_input"
      :class="[type]"
      :rules="allRules"
      @input="updateValue"
      @paste.prevent
      :label="_label"
      :required="required"
      :type="showPass ? 'text' : 'password'"
      :append-inner-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
      @click:append-inner="showPass = !showPass"
      :aria-label="`input ${type}`"
      :name="`input ${type}`"
      v-model="_modelValue"
    >
      <slot />
      <template v-slot:append-inner>
        <div class="ms-2">
          <slot name="appendInner"></slot>
        </div>
      </template>

      <template v-slot:prepend-inner>
        <slot name="prependInner"></slot>
      </template>
    </v-text-field>
  </div>

  <div class="unsuported input type" v-else></div>
</template>

<script setup>
defineOptions({
  inheritAttrs: false,
});

const props = defineProps({
  modelValue: {
    required: true,
  },
  rules: {
    required: false,
    type: Array,
    default: () => [],
  },
  type: {
    default: "text",
    type: String,
  },
  required: {
    required: false,
    default: false,
    type: Boolean,
  },
  label: {
    required: false,
    default: "",
    type: String,
  },

  up_mode: {
    required: false,
    default: true,
    type: Boolean,
  },
});

const emits = defineEmits(["update:modelValue"]);
const updateValue = (e) => {
  emits("update:modelValue", e.target.value);
};

const _label = computed(() => {
  if (props.up_mode) return "";
  return props.label || props.placeholder;
});

const _modelValue = ref(props.modelValue);

let default_rules = [
  props.required ? useInputRules().required : () => true,
  props.type == "email" ? useInputRules().email : () => true,
  props.type == "url" ? useInputRules().url : () => true,
];

const allRules = computed(() => {
  return [...default_rules, ...props.rules];
});

const showPass = ref(false);

const clearValue = () => {
  emits("update:modelValue", null);
};
</script>
