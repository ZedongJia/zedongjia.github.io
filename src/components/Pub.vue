<template>
  <div class="pub-list" v-if="groupedPapers.length">
    <div v-for="group in groupedPapers" :key="group.year" class="pub-year-group">
      <h2 class="pub-year-title">{{ group.year }}</h2>
      <article class="pub-item" v-for="paper in group.papers" :key="paper.globalIndex" :id="'pub-' + paper.globalIndex" :class="{ 'pub-highlight': highlightedIndex === paper.globalIndex }">
        <div class="pub-index">{{ paper.globalIndex + 1 }}</div>
        <div class="pub-content">
          <h3 class="pub-title">{{ paper.title }}</h3>
          <div class="pub-author">
            <template v-for="(author, i) in paper.authors" :key="i">
              <AuthorTooltip v-if="getAuthorInfo(author)" :info="getAuthorInfo(author)" :is-me="author.includes('Zedong Jia')" :name="author">{{ author }}</AuthorTooltip>
              <template v-else>
                <strong v-if="author.includes('Zedong Jia')" class="author-highlight">{{ author }}</strong>
                <span v-else>{{ author }}</span>
              </template>
              <span v-if="i < paper.authors.length - 1">, </span>
            </template>
          </div>
          <div class="pub-venue">{{ paper.venue }}</div>
          <div class="pub-tags">
            <TagBadge v-if="paper.ccf" :type="paper.ccf.toLowerCase()">CCF {{ paper.ccf }}</TagBadge>
            <TagBadge v-if="paper.thcpl" :type="paper.thcpl.toLowerCase()">THCPL {{ paper.thcpl }}</TagBadge>
            <TagBadge v-for="tag in paper.tags" :key="tag" type="default">{{ tag }}</TagBadge>
          </div>
          <div class="pub-actions">
            <a v-if="paper.paper" class="pub-action" :href="paper.paper" target="_blank" rel="noopener">
              <Icon name="paper" /> Paper
            </a>
            <a v-if="paper.code" class="pub-action" :href="paper.code" target="_blank" rel="noopener">
              <Icon name="share" /> Code
            </a>
          </div>
        </div>
      </article>
    </div>
  </div>
  <div class="pub-empty" v-else>No publications found.</div>
</template>

<script setup>
import Icon from './Icon.vue'
import TagBadge from './TagBadge.vue'
import AuthorTooltip from './AuthorTooltip.vue'
import pubs from '../data/pubs.yaml'
import authors from '../data/authors.yaml'
import { ref, computed, onMounted, onUnmounted } from 'vue'

const groupedPapers = computed(() => {
  const sorted = [...pubs]
    .sort((a, b) => b.year - a.year)
    .map((p, i) => ({ ...p, globalIndex: i }))
  const groups = []
  const map = new Map()
  sorted.forEach(paper => {
    if (!map.has(paper.year)) {
      const group = { year: paper.year, papers: [] }
      map.set(paper.year, group)
      groups.push(group)
    }
    map.get(paper.year).papers.push(paper)
  })
  return groups
})

function cleanName(name) {
  return name.replace(/\*+$/, '').trim()
}

function getAuthorInfo(author) {
  const name = cleanName(author)
  const info = authors[name]
  if (!info) return null
  if (info.orcid || info.homepage || info.institution || info.title || info.lab || info.department) return info
  return null
}

const highlightedIndex = ref(-1)
let highlightTimer = null

function handleHashChange() {
  const hash = window.location.hash
  const match = hash.match(/^#pub-(\d+)$/)
  if (match) {
    highlightedIndex.value = parseInt(match[1])
    clearTimeout(highlightTimer)
    highlightTimer = setTimeout(() => {
      highlightedIndex.value = -1
    }, 2500)
  }
}

onMounted(() => {
  window.addEventListener('hashchange', handleHashChange)
  handleHashChange()
})

onUnmounted(() => {
  window.removeEventListener('hashchange', handleHashChange)
  clearTimeout(highlightTimer)
})
</script>

<style scoped>
.pub-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
}

.pub-year-group {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.pub-year-title {
  font-size: var(--text-lg);
  font-weight: 700;
  color: var(--color-text-primary);
  padding-bottom: var(--space-1);
  border-bottom: 2px solid var(--color-accent);
  display: inline-block;
  width: fit-content;
}

.pub-item {
  display: flex;
  gap: var(--space-3);
  padding: var(--space-3);
  scroll-margin-top: 70px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background: var(--color-bg-card);
  box-shadow: var(--shadow-card);
  transition: all var(--transition-normal);
}

.pub-item:hover {
  border-color: var(--color-border-hover);
  box-shadow: var(--shadow-card-hover);
  transform: translateY(-2px);
}

.pub-index {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: var(--radius-full);
  background: var(--color-accent-bg);
  color: var(--color-accent);
  font-size: var(--text-sm);
  font-weight: 700;
  flex-shrink: 0;
  line-height: 28px;
}

.pub-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  min-width: 0;
}

.pub-title {
  font-size: var(--text-base);
  font-weight: 600;
  color: var(--color-text-primary);
  line-height: var(--leading-tight);
}

.pub-author {
  font-size: var(--text-sm);
  font-style: italic;
  color: var(--color-text-muted);
  line-height: var(--leading-normal);
}

.pub-author .author-highlight {
  font-weight: 700;
  color: var(--color-accent);
  font-style: normal;
}

.pub-venue {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
}

.pub-tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  margin-top: var(--space-1);
}

.pub-actions {
  display: flex;
  gap: var(--space-2);
  margin-top: var(--space-1);
}

.pub-action {
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);
  padding: var(--space-1) var(--space-2);
  font-size: var(--text-xs);
  font-weight: 500;
  color: var(--color-text-secondary);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  transition: all var(--transition-fast);
}

.pub-action:hover {
  color: var(--color-accent);
  border-color: var(--color-accent-border);
  background: var(--color-accent-bg);
}

.pub-action :deep(svg) {
  width: 12px;
  height: 12px;
}

.pub-highlight {
  border-color: var(--color-accent) !important;
  box-shadow: 0 0 0 2px var(--color-accent-bg), var(--shadow-card-hover) !important;
  animation: highlightPulse 2.5s ease-out;
}

@keyframes highlightPulse {
  0% {
    background: var(--color-accent-bg);
    border-color: var(--color-accent);
  }
  100% {
    background: var(--color-bg-card);
  }
}

.pub-empty {
  text-align: center;
  padding: var(--space-8);
  color: var(--color-text-muted);
  font-size: var(--text-sm);
}

@media (max-width: 768px) {
  .pub-item {
    flex-direction: column;
    gap: var(--space-2);
  }

}
</style>