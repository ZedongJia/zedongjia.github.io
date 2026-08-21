<template>
  <div class="pub-list" v-if="groupedPapers.length">
    <div class="pub-toolbar">
      <div class="pub-search">
        <label class="sr-only" for="publication-search">Search publications</label>
        <span v-for="tag in selectedTags" :key="tag" class="search-tag">
          {{ tag }}
          <button type="button" :aria-label="`Remove ${tag} filter`" @click.prevent="removeTag(tag)">×</button>
        </span>
        <input id="publication-search" v-model.trim="searchQuery" type="search" placeholder="Search title, author, venue…" />
      </div>
      <div class="pub-filter" aria-label="Filter publications by tag">
        <button v-for="tag in availableTags" :key="tag" type="button" class="filter-button" :class="{ active: selectedTags.includes(tag) }" @click="toggleTag(tag)">{{ tag }}</button>
      </div>
    </div>
    <div v-if="filteredGroups.length" class="pub-results">
    <div v-if="featuredPapers.length" class="featured-group">
      <h3 class="pub-year-title">Selected Publications</h3>
      <article class="pub-item" v-for="paper in featuredPapers" :key="`featured-${paper.globalIndex}`">
        <div class="pub-index">{{ paper.globalIndex + 1 }}</div>
        <div class="pub-content">
          <h3 class="pub-title">{{ paper.title }}</h3>
          <div class="pub-meta"><span class="pub-author">{{ paper.authors.join(', ') }}</span><span class="pub-venue">{{ paper.venue }} · {{ paper.year }}</span></div>
          <div class="pub-tags">
            <TagBadge v-if="paper.ccf" :type="paper.ccf.toLowerCase()">CCF {{ paper.ccf }}</TagBadge>
            <TagBadge v-if="paper.thcpl" :type="paper.thcpl.toLowerCase()">THCPL {{ paper.thcpl }}</TagBadge>
            <TagBadge v-for="tag in displayTags(paper)" :key="tag" type="default">{{ tag }}</TagBadge>
          </div>
        </div>
        <div class="pub-actions">
          <a v-if="paper.paper" class="pub-action" :href="paper.paper" target="_blank" rel="noopener noreferrer"><Icon name="paper" /> Paper</a>
          <a v-if="paper.code" class="pub-action" :href="paper.code" target="_blank" rel="noopener noreferrer"><Icon name="share" /> Code</a>
        </div>
      </article>
    </div>
    <div v-for="group in filteredGroups" :key="group.year" class="pub-year-group">
      <h3 class="pub-year-title">{{ group.year }}</h3>
      <article class="pub-item" v-for="paper in group.papers" :key="paper.globalIndex" :id="'pub-' + paper.globalIndex" :class="{ 'pub-highlight': highlightedIndex === paper.globalIndex }">
        <div class="pub-index">{{ paper.globalIndex + 1 }}</div>
        <div class="pub-content">
          <h3 class="pub-title">{{ paper.title }}</h3>
          <div class="pub-meta">
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
          </div>
          <div class="pub-tags">
            <TagBadge v-if="paper.ccf" :type="paper.ccf.toLowerCase()">CCF {{ paper.ccf }}</TagBadge>
            <TagBadge v-if="paper.thcpl" :type="paper.thcpl.toLowerCase()">THCPL {{ paper.thcpl }}</TagBadge>
            <TagBadge v-for="tag in displayTags(paper)" :key="tag" type="default">{{ tag }}</TagBadge>
          </div>
        </div>
        <div class="pub-actions">
          <a v-if="paper.paper" class="pub-action" :href="paper.paper" target="_blank" rel="noopener noreferrer"><Icon name="paper" /> Paper</a>
          <a v-if="paper.code" class="pub-action" :href="paper.code" target="_blank" rel="noopener noreferrer"><Icon name="share" /> Code</a>
        </div>
      </article>
    </div>
    </div>
    <p v-else class="pub-empty">No publications match the current search.</p>
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

const searchQuery = ref('')
const selectedTags = ref([])

const sortedPapers = computed(() => [...pubs]
    .sort((a, b) => b.year - a.year)
    .map((p, i) => ({ ...p, globalIndex: i }))
)

function groupPapers(papers) {
  const groups = []
  const map = new Map()
  papers.forEach(paper => {
    if (!map.has(paper.year)) {
      const group = { year: paper.year, papers: [] }
      map.set(paper.year, group)
      groups.push(group)
    }
    map.get(paper.year).papers.push(paper)
  })
  return groups
}

const groupedPapers = computed(() => groupPapers(sortedPapers.value))

const availableTags = computed(() => [...new Set(sortedPapers.value.flatMap(paper => displayTags(paper)))].sort((a, b) => a.localeCompare(b)))

const filteredPapers = computed(() => {
  const keyword = searchQuery.value.toLocaleLowerCase()
  return sortedPapers.value.filter(paper => {
    const searchable = [paper.title, paper.venue, paper.year, paper.topic, paper.research_area, ...(paper.authors || []), ...displayTags(paper)]
      .filter(Boolean)
      .join(' ')
      .toLocaleLowerCase()
    const matchesKeyword = !keyword || searchable.includes(keyword)
    const matchesTag = selectedTags.value.every(tag => displayTags(paper).includes(tag))
    return matchesKeyword && matchesTag
  })
})

function toggleTag(tag) {
  selectedTags.value = selectedTags.value.includes(tag)
    ? selectedTags.value.filter(selected => selected !== tag)
    : [...selectedTags.value, tag]
}

function removeTag(tag) {
  selectedTags.value = selectedTags.value.filter(selected => selected !== tag)
}

const filteredGroups = computed(() => groupPapers(filteredPapers.value))

const featuredPapers = computed(() => filteredPapers.value.filter(paper => paper.featured))

function displayTags(paper) {
  return paper.tags?.length ? paper.tags : (paper.topic ? [paper.topic] : [])
}

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
  gap: var(--space-content);
}

.pub-toolbar {
  display: grid;
  grid-template-columns: minmax(210px, 280px) minmax(0, 1fr);
  gap: var(--space-content);
  align-items: start;
  padding-bottom: var(--space-content);
  border-bottom: 1px solid var(--color-divider);
}

.pub-search input {
  flex: 1;
  min-width: 150px;
  padding: var(--space-inline) 0;
  border: 0;
  background: transparent;
  color: var(--color-text-primary);
  font: inherit;
  font-size: var(--text-body);
}

.pub-search {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--space-inline);
  min-height: 34px;
  padding: var(--space-px) var(--space-item);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  background: transparent;
}

.pub-search input::placeholder { color: var(--color-text-muted); }
.pub-search:focus-within { outline: 2px solid var(--color-accent-border); outline-offset: 1px; border-color: var(--color-accent); }

.search-tag {
  display: inline-flex;
  align-items: center;
  gap: var(--space-inline);
  padding: var(--space-px) var(--space-inline);
  border-radius: var(--radius-sm);
  background: var(--color-accent-bg);
  color: var(--color-accent);
  font-size: var(--text-meta);
  white-space: nowrap;
}

.search-tag button {
  padding: 0;
  border: 0;
  background: transparent;
  color: inherit;
  cursor: pointer;
  font: inherit;
  font-size: var(--text-body);
  line-height: 1;
}

.pub-filter { display: flex; flex-wrap: wrap; gap: var(--space-inline); }

.filter-button {
  padding: var(--space-px) var(--space-inline);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-full);
  background: var(--color-bg-card);
  color: var(--color-text-muted);
  cursor: pointer;
  font: inherit;
  font-size: var(--text-meta);
  line-height: var(--leading-content);
}

.filter-button:hover { color: var(--color-text-primary); border-color: var(--color-border-hover); }
.filter-button.active { color: var(--color-accent); border-color: var(--color-accent-border); background: var(--color-accent-bg); }

.pub-results { display: flex; flex-direction: column; gap: var(--space-content); }

.featured-group { display: flex; flex-direction: column; }

.pub-year-group {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.pub-year-title {
  font-size: var(--text-heading-3);
  font-weight: 700;
  color: var(--color-text-primary);
  padding-bottom: var(--space-1);
  border-bottom: 1px solid var(--color-divider);
}

.pub-item {
  display: grid;
  grid-template-columns: 28px minmax(0, 1fr) auto;
  align-items: start;
  gap: var(--space-2);
  padding: var(--space-content) 0;
  position: relative;
  z-index: 0;
  scroll-margin-top: 70px;
  border-bottom: 1px solid var(--color-divider);
  transition: background-color var(--transition-fast);
}

.pub-item:hover {
  z-index: 10;
  background: var(--color-bg-card-hover);
}

.pub-index {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  color: var(--color-accent);
  font-family: var(--font-mono);
  font-size: var(--text-meta);
  font-weight: 700;
  flex-shrink: 0;
  line-height: 22px;
}

.pub-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: var(--space-content-tight);
  min-width: 0;
}

.pub-title {
  font-size: var(--text-heading-3);
  font-weight: 600;
  color: var(--color-text-primary);
  line-height: var(--leading-tight);
}

.pub-author {
  font-size: var(--text-xs);
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
  flex-basis: 100%;
  font-size: var(--text-xs);
  color: var(--color-text-secondary);
}

.pub-meta {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  column-gap: var(--space-2);
  row-gap: var(--space-px);
}

.pub-tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-1);
}

.pub-actions {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: var(--space-2);
}

.pub-action {
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);
  padding: 0;
  font-size: var(--text-meta);
  font-weight: 500;
  color: var(--color-accent);
  transition: color var(--transition-fast);
}

.pub-action:hover {
  color: var(--color-accent-light);
  text-decoration: underline;
}

.pub-action :deep(svg) {
  width: 12px;
  height: 12px;
}

.pub-highlight {
  background: var(--color-accent-bg) !important;
  animation: highlightPulse 2.5s ease-out;
}

@keyframes highlightPulse {
  0% {
    background: var(--color-accent-bg);
  }
  100% {
    background: transparent;
  }
}

.pub-empty {
  text-align: center;
  padding: var(--space-8);
  color: var(--color-text-muted);
  font-size: var(--text-sm);
}

@media (max-width: 768px) {
  .pub-toolbar { grid-template-columns: 1fr; gap: var(--space-item); }
  .pub-item {
    grid-template-columns: 24px minmax(0, 1fr);
  }

  .pub-index { width: 24px; height: 24px; line-height: 24px; }
  .pub-actions { grid-column: 2; flex-direction: row; align-items: center; }
}
</style>
