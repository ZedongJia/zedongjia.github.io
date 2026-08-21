<template>
  <h2 class="section-title">
    <span class="title-text">{{ title }}</span>
  </h2>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true
  }
})
</script>

<style scoped>
.section-title {
  position: relative;
  margin-top: 0;
  margin-bottom: var(--space-1);
  padding-left: var(--space-3);
  font-size: var(--text-heading-2);
  font-weight: 700;
  color: var(--color-text-primary);
  letter-spacing: -0.01em;
}

.section-title::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 4px;
  height: 70%;
  border-radius: var(--radius-full);
  background: linear-gradient(180deg, var(--color-accent), var(--color-accent-light));
}
</style>
