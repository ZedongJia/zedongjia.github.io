<template>
  <div class="award-list">
    <div class="award-item" v-for="(item, i) in awards" :key="i">
      <div class="award-dot-line">
        <div class="award-dot"></div>
        <div v-if="i < awards.length - 1" class="award-line"></div>
      </div>
      <div class="award-content">
        <div class="award-date">{{ formatDate(item.date) }}</div>
        <div class="award-text">{{ item.award }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import awards from '../data/awards.yaml'

function formatDate(dateStr) {
  const [year, month] = dateStr.split('-')
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  return `${months[parseInt(month) - 1]} ${year}`
}
</script>

<style scoped>
.award-list {
  display: flex;
  flex-direction: column;
}

.award-item {
  display: flex;
  gap: var(--space-3);
  min-height: 48px;
}

.award-dot-line {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 16px;
  flex-shrink: 0;
}

.award-dot {
  width: 10px;
  height: 10px;
  border-radius: var(--radius-full);
  background: var(--color-accent);
  margin-top: 5px;
  flex-shrink: 0;
}

.award-line {
  width: 2px;
  flex: 1;
  background: var(--color-border);
  margin-top: var(--space-1);
}

.award-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding-bottom: var(--space-3);
}

.award-date {
  font-size: var(--text-xs);
  font-weight: 600;
  color: var(--color-accent);
}

.award-text {
  font-size: var(--text-sm);
  color: var(--color-text-primary);
  line-height: var(--leading-normal);
}
</style>