<template>
  <div class="edu-list">
    <div class="edu-item" v-for="(edu, i) in educations" :key="edu.school">
      <div class="edu-dot-line">
        <div class="edu-dot"></div>
        <div v-if="i < educations.length - 1" class="edu-line"></div>
      </div>
      <div class="edu-content">
        <div class="edu-period">{{ edu.period }}</div>
        <div class="edu-school">
          <a :href="edu.url" target="_blank" rel="noopener">{{ edu.school }}</a>
        </div>
        <div class="edu-degree">{{ edu.degree }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
const educations = [
  {
    school: 'Tsinghua University',
    url: 'https://www.tsinghua.edu.cn/',
    degree: 'M.S. Candidate · INSC',
    period: '2025.09 — 2028.08'
  },
  {
    school: 'Nankai University',
    url: 'https://www.nankai.edu.cn/',
    degree: 'B.S. · Software Engineering',
    period: '2021.09 — 2025.08'
  }
]
</script>

<style scoped>
.edu-list {
  display: flex;
  flex-direction: column;
}

.edu-item {
  display: flex;
  gap: var(--space-3);
  min-height: 48px;
}

.edu-dot-line {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 16px;
  flex-shrink: 0;
}

.edu-dot {
  width: 10px;
  height: 10px;
  border-radius: var(--radius-full);
  background: var(--color-accent);
  margin-top: 5px;
  flex-shrink: 0;
}

.edu-line {
  width: 2px;
  flex: 1;
  background: var(--color-border);
  margin-top: var(--space-1);
}

.edu-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding-bottom: var(--space-4);
}

.edu-period {
  font-size: var(--text-xs);
  font-weight: 600;
  color: var(--color-accent);
  font-family: var(--font-mono);
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
</style>