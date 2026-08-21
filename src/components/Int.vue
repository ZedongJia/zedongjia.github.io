<template>
  <div class="research-list" :class="{ compact }" v-if="groupedResearch.length">
    <div v-for="group in groupedResearch" :key="group.category" class="research-group">
      <h3 class="research-category">{{ group.category }}</h3>
      <ul class="interest-list">
        <li v-for="area in group.areas" :key="area.name" class="interest-item">
          <span class="interest-text">
            <strong>{{ area.name }}</strong>
            <span v-if="area.papers.length" class="paper-refs"><span class="paper-refs-label">Related papers:</span>
              <template v-for="(p, i) in area.papers" :key="p.index">
                <a :href="`/publications.html#pub-${p.index}`" class="topic-link">{{ p.label }}</a><span v-if="i < area.papers.length - 1">, </span>
              </template>
            </span>
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import pubs from '../data/pubs.yaml'
import { computed } from 'vue'

defineProps({
  compact: { type: Boolean, default: false }
})

const sortedPubs = [...pubs].sort((a, b) => b.year - a.year)

const groupedResearch = computed(() => {
  const groups = new Map()
  sortedPubs.forEach((paper, index) => {
    const category = paper.research_area || 'Research Areas'
    const topic = paper.topic || 'Other'
    if (!groups.has(category)) groups.set(category, new Map())
    const areas = groups.get(category)
    if (!areas.has(topic)) areas.set(topic, { name: topic, papers: [] })
    areas.get(topic).papers.push({ index, label: paper.label || paper.venue })
  })
  return [...groups.entries()].map(([category, areas]) => ({ category, areas: [...areas.values()] }))
})
</script>

<style scoped>
.research-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.research-group { display: flex; flex-direction: column; gap: var(--space-micro); }

.research-category {
  font-size: var(--text-heading-3);
  font-weight: 600;
  color: var(--color-text-primary);
  line-height: var(--leading-normal);
}

.interest-list {
  display: flex;
  flex-direction: column;
}

.interest-item {
  display: flex;
  padding: var(--space-px) 0;
}

.interest-text {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  line-height: var(--leading-normal);
}

.paper-refs {
  display: block;
  margin-top: var(--space-px);
  color: var(--color-text-muted);
}

.paper-refs-label { margin-right: var(--space-1); }

.research-list.compact { gap: 0; }
.research-list.compact .research-group {
  display: grid;
  grid-template-columns: minmax(210px, 0.85fr) minmax(0, 2fr);
  gap: var(--space-3);
  padding: var(--space-2) 0;
  border-top: 1px solid var(--color-divider);
}
.research-list.compact .research-group:first-child { padding-top: 0; border-top: 0; }
.research-list.compact .research-category {
  align-self: start;
  padding-left: var(--space-2);
  border-left: 2px solid var(--color-accent);
  font-size: var(--text-body);
  color: var(--color-text-primary);
  font-weight: 600;
  line-height: var(--leading-normal);
}
.research-list.compact .interest-list { gap: var(--space-1); }
.research-list.compact .interest-item { padding: 0; }
.research-list.compact .interest-text { font-size: var(--text-meta); }
.research-list.compact .paper-refs { font-size: var(--text-label); }

@media (max-width: 600px) {
  .research-list.compact .research-group { grid-template-columns: 1fr; gap: var(--space-1); }
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
