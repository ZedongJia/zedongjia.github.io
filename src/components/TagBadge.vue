<template>
  <span class="tag-badge" :class="[`tag-${type}`]">
    <slot />
  </span>
</template>

<script setup>
defineProps({
  type: {
    type: String,
    default: 'default',
    validator: (v) => ['default', 'a', 'b', 'c'].includes(v)
  }
})
</script>

<style scoped>
.tag-badge {
  display: inline-flex;
  align-items: center;
  padding: 0;
  font-size: var(--text-label);
  font-weight: 500;
  letter-spacing: 0;
  white-space: nowrap;
}

.tag-badge:not(:last-child)::after {
  content: '·';
  margin: 0 var(--space-1);
  color: var(--color-text-muted);
}

.tag-default {
  color: var(--color-text-muted);
}

.tag-a {
  color: var(--color-tag-a);
}

.tag-b {
  color: var(--color-tag-b);
}

.tag-c {
  color: var(--color-tag-c);
}
</style>
