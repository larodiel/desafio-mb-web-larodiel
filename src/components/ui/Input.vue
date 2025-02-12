<script setup>
import {ref, computed, onUnmounted, watch} from 'vue';
import {maskPatterns, applyMask, removeMask} from '../../../utils/maskPatterns';
import '../../styles/ui/input.scss';

const isValid = ref(false);
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
  errorMessage: {
    type: String,
    default: '',
  },
});

const errorMessages = computed(() => {
  const errorMessage = props.errorMessage || validationErrorMessage.value;
  if (!errorMessage) return '';
  return errorMessage.trim();
});

const inputClasses = computed(() => ({
  'mb-input': true,
  'mb-input-container': true,
  'mb-input-error': errorMessages.value !== '',
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
    <p class="mb-input-error-message" v-if="errorMessages !== ''" role="alert">
      {{ errorMessages }}
    </p>
  </div>
</template>
