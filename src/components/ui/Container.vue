<script setup>
import {computed} from 'vue';

const props = defineProps({
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['xs', 'sm', 'md', 'lg'].includes(value),
  },
  center: {
    type: Boolean,
    default: false,
  },
  display: {
    type: String,
    default: 'block',
    validator: (value) => ['block', 'flex'].includes(value),
  },
  gap: {
    type: String,
    default: 'xs',
    validator: (value) => ['xs', 'sm', 'md', 'lg'].includes(value),
  },
  direction: {
    type: String,
    default: 'row',
    validator: (value) => ['row', 'col'].includes(value),
  },
  marginTop: {
    type: String,
    default: 'xs',
    validator: (value) => ['xs', 'sm', 'md', 'lg'].includes(value),
  },
  bleed: {
    type: String,
    default: '',
    validator: (value) => ['', 'xs', 'sm', 'md', 'lg'].includes(value),
  },
});

const classes = computed(() => [
  'mb-container',
  `mb-container-${props.size}`,
  props.display,
  `direction-${props.direction}`,
  `gap-${props.gap}`,
  props.center ? 'mb-container-center' : '',
  `mt-${props.marginTop}`,
  `bleed-${props.bleed}`,
]);
</script>

<template>
  <div :class="classes">
    <slot></slot>
  </div>
</template>

<style scoped>
.mb-container {
  max-width: 1200px;
  width: 100%;

  &.mb-container-center {
    margin-left: auto;
    margin-right: auto;
  }

  &.mb-container-xs {
    max-width: 400px;
  }

  &.mb-container-sm {
    max-width: 600px;
  }

  &.mb-container-md {
    max-width: 800px;
  }

  &.mb-container-lg {
    max-width: 1000px;
  }
}

.flex {
  display: flex;

  &.direction-row {
    flex-direction: row;
  }

  &.direction-col {
    flex-direction: column;
  }

  &.gap-xs {
    gap: var(--gap-xs);
  }

  &.gap-sm {
    gap: var(--gap-sm);
  }

  &.gap-md {
    gap: var(--gap-md);
  }

  &.gap-lg {
    gap: var(--gap-lg);
  }
}

.block {
  display: block;
}

.mt-xs {
  margin-top: var(--gap-xs);
}

.mt-sm {
  margin-top: var(--gap-sm);
}

.mt-md {
  margin-top: var(--gap-md);
}

.mt-lg {
  margin-top: var(--gap-lg);
}

.bleed-xs {
  padding-left: var(--gap-xs);
  padding-right: var(--gap-xs);
}

.bleed-sm {
  padding-left: var(--gap-sm);
  padding-right: var(--gap-sm);
}

.bleed-md {
  padding-left: var(--gap-md);
  padding-right: var(--gap-md);
}

.bleed-lg {
  padding-left: var(--gap-lg);
  padding-right: var(--gap-lg);
}
</style>
