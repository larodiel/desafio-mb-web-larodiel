<script setup>
import {computed} from 'vue';
import '../../styles/ui/button.scss';

const props = defineProps({
  variant: {
    type: String,
    default: 'solid',
    validator: (value) => ['solid', 'outline'].includes(value),
  },
  color: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary'].includes(value),
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    default: 'button',
  },
});

const classes = computed(() => [
  'mb-button',
  `mb-button-${props.variant}`,
  `mb-button-${props.color}`,
  `mb-button-${props.disabled ? 'disabled' : 'enabled'}`,
]);
</script>

<template>
  <button :type="type" :class="classes" :disabled="disabled || loading">
    <span v-if="loading">⏳</span>
    <slot></slot>
  </button>
</template>
