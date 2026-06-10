<template>
  <div class="edu-grid">
    <div class="edu-card card" v-for="edu in educations" :key="edu.school">
      <div class="edu-school">
        <a :href="edu.url" target="_blank" rel="noopener">{{ edu.school }}</a>
      </div>
      <div class="edu-degree">{{ edu.degree }}</div>
      <div class="edu-time">{{ edu.period }}</div>
    </div>
  </div>
</template>

<script setup>
const educations = [
  {
    school: 'NanKai University',
    url: 'https://www.nankai.edu.cn/',
    degree: 'B.S. · Software Engineering',
    period: '2021.09 — 2025.08'
  },
  {
    school: 'Tsinghua University',
    url: 'https://www.tsinghua.edu.cn/',
    degree: 'M.S. Candidate · INSC',
    period: '2025.09 — 2028.08'
  }
]
</script>

<style scoped>
.edu-grid {
  display: grid;
  gap: var(--space-3);
}

.edu-card {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.edu-school {
  font-size: var(--text-base);
  font-weight: 600;
}

.edu-school a {
  color: var(--color-text-primary);
  transition: color var(--transition-fast);
}

.edu-school a:hover {
  color: var(--color-accent);
}

.edu-degree {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
}

.edu-time {
  font-size: var(--text-sm);
  color: var(--color-text-muted);
  font-family: var(--font-mono);
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