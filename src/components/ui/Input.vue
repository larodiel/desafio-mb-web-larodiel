<script setup>
import {ref, computed, onUnmounted, watch} from 'vue';
import {maskPatterns, applyMask, removeMask} from '../../../utils/maskPatterns';

const isValid = ref(true);
const debounceTimeout = ref(null);
const inputRef = ref(null);
const rawValue = ref(null);
const validationErrorMessage = ref(null);
const emit = defineEmits(['input-validation', 'update:model-value', 'enter']);

const modelValue = defineModel({
  default: '',
  type: String,
});

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  label: String,
  type: {
    type: String,
    default: 'text',
    validator: (value) => ['text', 'password', 'email', 'number', 'date', 'tel'].includes(value),
  },
  debounce: {
    type: Number,
    default: 0,
  },
  placeholder: String,
  name: {
    type: String,
    required: true,
  },
  validation: Function,
  mask: {
    type: String,
    default: null,
    validator: (value) => ['cpf', 'cnpj', 'date', 'phone'].includes(value),
  },
  error: {
    type: Boolean,
    default: false,
  },
  errorMessage: {
    type: String,
    default: '',
  },
});

const hasError = computed(() => {
  return props.error || !isValid.value;
});

const errorMessages = computed(() => {
  return props.errorMessage || validationErrorMessage;
});

const inputClasses = computed(() => ({
  'input-container': true,
  'input-error': !isValid.value,
}));

const currentMask = computed(() => {
  if (!props.mask || !maskPatterns[props.mask]) return null;

  return maskPatterns[props.mask];
});

const updateValue = (value) => {
  rawValue.value = removeMask(value);

  if (props.mask) {
    if (!currentMask) {
      modelValue.value = value;
    }

    modelValue.value = applyMask(
      rawValue.value,
      currentMask.value.regex,
      currentMask.value.format,
      currentMask.value.maxLength
    );
  }

  modelValue.value = value;
};

const handleInput = (e) => {
  if (debounceTimeout.value) {
    clearTimeout(debounceTimeout.value);
  }

  if (props.debounce > 0) {
    debounceTimeout.value = setTimeout(() => updateValue(e.target.value), props.debounce);
  } else {
    updateValue(e.target.value);
  }
};

const handleBlur = () => {
  if (props.validation) {
    const validationResult = props.validation(rawValue.value);
    isValid.value = validationResult.isValid;
    validationErrorMessage.value = validationResult.message;
    emit('input-validation', validationResult);
  }
};

const handleEnter = () => {
  emit('enter', {
    value: modelValue.value,
    rawValue: rawValue.value,
    isValid: isValid.value,
    inputRef: inputRef.value,
  });
};

onUnmounted(() => {
  if (debounceTimeout.value) {
    clearTimeout(debounceTimeout.value);
  }
});

watch(
  () => modelValue.value,
  (newValue) => {
    if (currentMask?.value?.regex) {
      const formatted = applyMask(
        newValue,
        currentMask.value.regex,
        currentMask.value.format,
        currentMask.value.maxLength
      );

      modelValue.value = formatted;
    }
  }
);

defineExpose({
  inputRef,
  rawValue,
  isValid,
});
</script>

<template>
  <div :class="inputClasses">
    <label :for="id">{{ label }}</label>
    <input
      ref="inputRef"
      @input="handleInput"
      @blur="handleBlur"
      :id="id"
      :type="type"
      :placeholder="placeholder"
      :value="modelValue"
      :name="name"
      @keydown.enter.prevent="handleEnter"
      autocomplete="off" />
    <p class="error-message" v-if="hasError" role="alert">
      {{ errorMessages }}
    </p>
  </div>
</template>

<style scoped>
.error-message {
  color: var(--error-color);
  font-size: 12px;
  margin-top: var(--gap-xs);
}

label {
  display: block;
  font: 400 16px/140% 'IBM Plex Sans', Arial, sans-serif;
  letter-spacing: 0.25px;
  text-align: left;
}

.input-error {
  input {
    border-color: var(--error-color);
  }
}

input {
  width: 100%;
  border: 1px solid var(--black);
  border-radius: 8px;
  padding: 10px 16px;
  outline: none;
  min-width: 180px;
  font-size: 16px;
  -webkit-appearance: none;
  appearance: none;
  box-sizing: border-box;

  &:invalid {
    border-color: var(--error-color);
  }
}
@starting-style {
  input:invalid {
    border-color: var(--black);
  }
}
</style>
