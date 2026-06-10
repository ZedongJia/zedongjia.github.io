<template>
  <div class="lab-grid">
    <div class="lab-card card" v-for="lab in labs" :key="lab.name">
      <div class="lab-header">
        <a class="lab-name" :href="lab.url" target="_blank" rel="noopener">{{ lab.name }}</a>
        <span v-if="lab.current" class="lab-current">current</span>
      </div>
      <div class="lab-detail">{{ lab.detail }}</div>
    </div>
  </div>
</template>

<script setup>
const labs = [
  {
    name: 'AIOPS@NKU',
    url: 'https://nkcs.iops.ai/',
    detail: 'Artificial Intelligence Operations',
    current: false
  },
  {
    name: 'THUNAME',
    url: 'https://thuname.github.io/',
    detail: 'Network Architecture and Measurement',
    current: true
  }
]
</script>

<style scoped>
.lab-grid {
  display: grid;
  gap: var(--space-3);
}

.lab-card {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.lab-header {
  display: flex;
  align-items: center;
  gap: var(--space-2);
}

.lab-name {
  font-size: var(--text-base);
  font-weight: 600;
  color: var(--color-text-primary);
  transition: color var(--transition-fast);
}

.lab-name:hover {
  color: var(--color-accent);
}

.lab-current {
  font-size: var(--text-xs);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: var(--space-1) var(--space-2);
  border-radius: var(--radius-full);
  background: var(--color-accent-bg);
  color: var(--color-accent);
}

.lab-detail {
  font-size: var(--text-sm);
  color: var(--color-text-muted);
}

.card {
  padding: var(--space-3);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background: var(--color-bg-card);
  box-shadow: var(--shadow-card);
  transition: all var(--transition-normal);
}

.card:hover {
  border-color: var(--color-border-hover);
  box-shadow: var(--shadow-card-hover);
  transform: translateY(-2px);
}
</style>