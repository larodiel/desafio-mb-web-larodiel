<script setup>
import {computed} from 'vue';
import '../../styles/ui/alert.scss';

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
