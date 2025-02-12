<script setup>
import {defineEmits, defineProps, onMounted, ref} from 'vue';
import {validationRules} from '../../../utils/signUpValidation';
import Input from '../ui/Input.vue';

const emit = defineEmits(['enter']);
const inputRef = ref(null);

defineProps({
  formState: {
    type: Object,
    required: true,
  },
  formErrors: {
    type: Object,
    required: true,
  },
  stepFields: {
    type: Array,
    required: true,
  },
});

onMounted(() => {
  if (inputRef.value) {
    inputRef.value[0].inputRef.focus();
  }
});
</script>
<template>
  <component
    :is="Input"
    ref="inputRef"
    v-for="(field, index) in stepFields"
    :key="field"
    v-model="formState[field].value"
    :id="formState[field].id"
    :label="formState[field].label"
    :type="formState[field].type"
    :placeholder="formState[field].placeholder"
    :name="formState[field].name"
    :mask="formState[field].mask"
    :error-message="formErrors[field]?.message"
    @enter="(e) => emit('enter', e)"
    @input-validation="(result) => (formErrors[field] = result)"
    :validation="() => validationRules[field](formState[field].value)"
    :debounce="50" />
</template>
