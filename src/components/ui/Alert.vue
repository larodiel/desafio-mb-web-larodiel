<script setup>
import {computed} from 'vue';

const props = defineProps({
  type: {
    type: String,
    default: 'info',
    validator: (value) => ['success', 'error', 'warning', 'info'].includes(value),
  },
  title: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(['close']);

const classes = computed(() => `alert alert-${props.type}`);
</script>

<template>
  <div :class="classes">
    <h2 class="alert-title">{{ title }}</h2>
    <slot></slot>
  </div>
</template>

<style scoped>
.alert {
  padding: var(--gap-sm);
  border-radius: 5px;
  margin: var(--gap-sm) 0;
  position: relative;
  font-size: var(--gap-sm);
}

.alert-title {
  margin-top: 0;
  font-size: 1.3rem;
  line-height: 1;
}

.alert-success {
  background-color: var(--success-color);
  color: var(--white);
  border: 1px solid var(--success-color);
}

.alert-error {
  background-color: var(--error-color);
  color: var(--white);
  border: 1px solid var(--error-color);
}

.alert-warning {
  background-color: var(--warning-color);
  color: color-mix(in srgb, var(--warning-color), black 50%);
  border: 1px solid var(--warning-color);
}

.alert-info {
  background-color: var(--info-color);
  color: var(--white);
  border: 1px solid var(--info-color);
}

.close-btn {
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  color: inherit;
}
</style>
