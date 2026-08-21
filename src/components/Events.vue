<template>
  <ol class="event-list">
    <li v-for="event in sortedEvents" :key="`${event.date}-${event.title}`" class="event-item">
      <time class="event-date" :datetime="event.date">{{ formatDate(event.date) }}</time>
      <div class="event-content">
        <span class="event-type">{{ formatType(event.type) }}</span>
        <a v-if="eventHref(event)" :href="eventHref(event)" :target="event.url ? '_blank' : undefined" :rel="event.url ? 'noopener noreferrer' : undefined">{{ event.title }}</a>
        <span v-else>{{ event.title }}</span>
      </div>
    </li>
  </ol>
</template>

<script setup>
import { computed } from 'vue'
import events from '../data/events.yaml'
import pubs from '../data/pubs.yaml'

const sortedEvents = computed(() => [...events].sort((a, b) => b.date.localeCompare(a.date)))
const sortedPubs = [...pubs].sort((a, b) => b.year - a.year)

function eventHref(event) {
  if (event.url) return event.url
  if (event.type !== 'publication') return ''
  const index = sortedPubs.findIndex(paper => event.title.startsWith(paper.title))
  return index >= 0 ? `/publications.html#pub-${index}` : ''
}

function formatDate(date) {
  return new Intl.DateTimeFormat('en', { year: 'numeric', month: 'short' }).format(new Date(`${date}T00:00:00`))
}

function formatType(type) {
  return { award: 'Award', publication: 'Publication', talk: 'Talk', news: 'News', project: 'Project', research: 'Research', service: 'Service' }[type] || 'Event'
}
</script>

<style scoped>
.event-list { display: flex; flex-direction: column; gap: var(--space-content); }
.event-item { display: grid; grid-template-columns: 76px 1fr; gap: var(--space-2); font-size: var(--text-sm); line-height: var(--leading-normal); }
.event-date { color: var(--color-accent); font-family: var(--font-mono); font-size: var(--text-meta); padding-top: var(--space-micro); }
.event-content { display: flex; align-items: baseline; gap: var(--space-2); min-width: 0; }
.event-type { flex-shrink: 0; padding: var(--space-px) var(--space-inline); border-radius: var(--radius-full); background: var(--color-accent-bg); color: var(--color-accent); font-size: var(--text-label); font-weight: 700; line-height: 1.4; text-transform: uppercase; }
.event-content a { color: var(--color-text-primary); }
.event-content a:hover { color: var(--color-accent); }
@media (max-width: 480px) { .event-item { grid-template-columns: 58px 1fr; } .event-content { align-items: flex-start; flex-direction: column; gap: var(--space-1); } }
</style>
