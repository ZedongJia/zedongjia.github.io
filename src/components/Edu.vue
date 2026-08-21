<template>
  <div class="edu-list">
    <div class="edu-item" v-for="(item, i) in experience" :key="`${item.organization}-${item.period}`">
      <div class="edu-dot-line">
        <div class="edu-dot"></div>
        <div v-if="i < experience.length - 1" class="edu-line"></div>
      </div>
      <div class="edu-content">
        <div class="edu-period">{{ item.period }}</div>
        <div class="edu-school">
          <a v-if="item.url" :href="item.url" target="_blank" rel="noopener noreferrer">{{ item.organization }}</a>
          <span v-else>{{ item.organization }}</span>
          <span class="edu-type">{{ item.type === 'internship' ? 'Internship' : 'Education' }}</span>
        </div>
        <div class="edu-degree">{{ item.role }}<span v-if="item.team"> · {{ item.team }}</span></div>
        <div v-if="item.detail" class="edu-detail">{{ item.detail }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import experience from '../data/experience.yaml'
</script>

<style scoped>
.edu-list {
  display: flex;
  flex-direction: column;
}

.edu-item {
  display: flex;
  gap: var(--space-3);
  min-height: 42px;
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
  gap: var(--space-content-tight);
  padding-bottom: var(--space-content);
}

.edu-item:last-child .edu-content {
  padding-bottom: 0;
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
  line-height: var(--leading-content);
}

.edu-type {
  display: inline-block;
  margin-left: var(--space-2);
  padding: var(--space-px) var(--space-inline);
  border-radius: var(--radius-full);
  background: var(--color-accent-bg);
  color: var(--color-accent);
  font-size: var(--text-label);
  font-weight: 700;
  line-height: 1.4;
  text-transform: uppercase;
  vertical-align: 1px;
}

.edu-detail {
  font-size: var(--text-sm);
  color: var(--color-text-muted);
  line-height: var(--leading-content);
}
</style>
