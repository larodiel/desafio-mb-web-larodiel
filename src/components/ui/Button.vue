<script setup>
import {computed} from 'vue';

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

<style scoped>
.mb-button {
  flex: 1;
  border: 1px solid var(--brand);
  color: var(--brand);
  background-color: transparent;
  display: inline-block;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  font: 500 0.875rem var(--ff-sans);
  text-transform: uppercase;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;

  &.mb-button-solid {
    background-color: var(--brand);
    color: var(--white);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}
</style>
