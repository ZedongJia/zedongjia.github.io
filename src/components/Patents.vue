<template>
  <ol class="patent-list">
    <li v-for="patent in sortedPatents" :key="patent.title" class="patent-item">
      <div class="patent-content">
        <h3 class="patent-title">{{ patent.title }}</h3>
        <p class="patent-authors">{{ patent.authors.join(', ') }}</p>
        <p class="patent-venue">{{ patent.venue }} · {{ patent.year }}</p>
      </div>
    </li>
  </ol>
</template>

<script setup>
import { computed } from 'vue'
import patents from '../data/patents.yaml'

const sortedPatents = computed(() => [...patents].sort((a, b) => b.year - a.year))
</script>

<style scoped>
.patent-list { display: flex; flex-direction: column; }
.patent-item { padding: var(--space-2) 0; border-top: 1px solid var(--color-divider); }
.patent-item:first-child { padding-top: 0; border-top: 0; }
.patent-title { font-size: var(--text-body); font-weight: 600; line-height: var(--leading-normal); color: var(--color-text-primary); }
.patent-authors,
.patent-venue { margin-top: var(--space-px); font-size: var(--text-meta); line-height: var(--leading-normal); color: var(--color-text-secondary); }
.patent-venue { color: var(--color-text-muted); }
</style>
