<script setup>
import {defineEmits, defineProps, onMounted, ref} from 'vue';
import {validationRules} from '../../../utils/signUpValidation';
import Container from '../ui/Container.vue';
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
  <Container display="flex" gap="xs" direction="col" v-for="(field, index) in stepFields" :key="field">
    <!-- Exibe o componente Input -->
    <Input
      ref="inputRef"
      v-model="formState[field].value"
      :id="formState[field].id"
      :label="formState[field].label"
      :type="formState[field].type"
      :placeholder="formState[field].placeholder"
      :name="formState[field].name"
      :mask="formState[field].mask"
      :error="!formErrors[field]?.isValid"
      :error-message="formErrors[field]?.message"
      @enter="(e) => emit('enter', e)"
      @input-validation="(result) => (formErrors[field] = result)"
      :validation="() => validationRules[field](formState[field].value)"
      :debounce="50" />
  </Container>
</template>
