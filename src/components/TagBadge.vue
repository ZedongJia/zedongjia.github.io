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
  padding: var(--space-1) var(--space-2);
  font-size: var(--text-xs);
  font-weight: 600;
  letter-spacing: 0.02em;
  border-radius: var(--radius-full);
  white-space: nowrap;
  transition: all var(--transition-fast);
}

.tag-default {
  background: var(--color-accent-bg);
  color: var(--color-accent);
}

.tag-a {
  background: rgba(225, 112, 85, 0.1);
  color: var(--color-tag-a);
}

.tag-b {
  background: rgba(240, 184, 102, 0.12);
  color: var(--color-tag-b);
}

.tag-c {
  background: rgba(142, 186, 58, 0.1);
  color: var(--color-tag-c);
}
</style>