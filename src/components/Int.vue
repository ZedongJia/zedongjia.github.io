<template>
  <ul class="interest-list" v-if="topics.length">
    <li v-for="topic in topics" :key="topic.name" class="interest-item">
      <span class="interest-icon"><Icon name="rocket" /></span>
      <span class="interest-text">
        {{ topic.name }} (
        <template v-for="(p, i) in topic.papers" :key="p.index">
          <a :href="'#pub-' + p.index" class="topic-link">{{ p.label }}</a><span v-if="i < topic.papers.length - 1">, </span>
        </template>
        )
      </span>
    </li>
  </ul>
</template>

<script setup>
import Icon from './Icon.vue'
import pubs from '../data/pubs.yaml'
import { computed } from 'vue'

const sortedPubs = [...pubs].sort((a, b) => b.year - a.year)

const topics = computed(() => {
  const map = new Map()
  sortedPubs.forEach((paper, index) => {
    if (!paper.topic) return
    if (!map.has(paper.topic)) {
      map.set(paper.topic, [])
    }
    map.get(paper.topic).push({ index, label: paper.label || paper.venue })
  })
  return Array.from(map.entries()).map(([name, papers]) => ({ name, papers }))
})
</script>

<style scoped>
.interest-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.interest-item {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-3);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background: var(--color-bg-card);
  transition: all var(--transition-normal);
}

.interest-item:hover {
  border-color: var(--color-border-hover);
  background: var(--color-bg-card-hover);
  transform: translateX(4px);
}

.interest-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: var(--radius-sm);
  background: var(--color-accent-bg);
  color: var(--color-accent);
  flex-shrink: 0;
}

.interest-icon :deep(svg) {
  width: 14px;
  height: 14px;
}

.interest-text {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  line-height: var(--leading-normal);
}

.topic-link {
  color: var(--color-accent);
  font-weight: 500;
  transition: color var(--transition-fast);
}

.topic-link:hover {
  color: var(--color-accent-light);
  text-decoration: underline;
}
</style>