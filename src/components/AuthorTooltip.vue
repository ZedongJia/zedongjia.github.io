<template>
  <span class="author-hover-wrapper" @mouseenter="show" @mouseleave="hide">
    <strong v-if="isMe" class="author-highlight"><slot></slot></strong>
    <span v-else class="author-link"><slot></slot></span>
    <div v-if="visible" class="author-tooltip">
      <div class="tooltip-header">
        <div class="tooltip-name">{{ displayName }}</div>
        <div v-if="info.title" class="tooltip-title">{{ info.title }}</div>
      </div>
      <div class="tooltip-details">
        <div v-if="info.institution" class="tooltip-detail-row">
          <span class="tooltip-detail-label">Affiliation</span>
          <span class="tooltip-detail-value">{{ info.institution }}</span>
        </div>
        <div v-if="info.lab" class="tooltip-detail-row">
          <span class="tooltip-detail-label">Lab</span>
          <span class="tooltip-detail-value">{{ info.lab }}</span>
        </div>
        <div v-if="info.department" class="tooltip-detail-row">
          <span class="tooltip-detail-label">Dept.</span>
          <span class="tooltip-detail-value">{{ info.department }}</span>
        </div>
      </div>
      <div v-if="info.orcid || info.homepage" class="tooltip-divider"></div>
      <div class="tooltip-links">
        <a v-if="info.orcid" class="tooltip-link" :href="info.orcid" target="_blank" rel="noopener">
          <Icon name="orcid" /> ORCID
        </a>
        <a v-if="info.homepage" class="tooltip-link" :href="info.homepage" target="_blank" rel="noopener">
          <Icon name="globe" /> Homepage
        </a>
      </div>
    </div>
  </span>
</template>

<script setup>
import { ref } from 'vue'
import Icon from './Icon.vue'

const props = defineProps({
  info: { type: Object, required: true },
  isMe: { type: Boolean, default: false },
  name: { type: String, default: '' }
})

const displayName = props.name.replace(/\*+$/, '').trim()

const visible = ref(false)

function show() {
  visible.value = true
}

function hide() {
  visible.value = false
}
</script>

<style scoped>
.author-hover-wrapper {
  position: relative;
  display: inline-block;
  cursor: pointer;
}

.author-highlight {
  font-weight: 700;
  color: var(--color-accent);
  font-style: normal;
}

.author-link {
  transition: color var(--transition-fast);
}

.author-hover-wrapper:hover .author-link {
  color: var(--color-accent);
}

.author-tooltip {
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-card-hover);
  padding: var(--space-2) var(--space-3);
  z-index: 100;
  white-space: nowrap;
  font-style: normal;
  /* Extend downward to overlap with the trigger text, eliminating any gap */
  padding-bottom: 8px;
  margin-bottom: -4px;
}

.tooltip-header {
  margin-bottom: var(--space-2);
}

.tooltip-name {
  font-size: var(--text-base);
  font-weight: 700;
  color: var(--color-text-primary);
  line-height: 1.3;
}

.tooltip-title {
  font-size: var(--text-sm);
  color: var(--color-accent);
  font-weight: 600;
  margin-top: 2px;
}

.tooltip-details {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.tooltip-detail-row {
  display: flex;
  align-items: baseline;
  gap: var(--space-2);
  font-size: var(--text-sm);
  line-height: 1.5;
}

.tooltip-detail-label {
  color: var(--color-text-muted);
  font-size: var(--text-xs);
  min-width: 56px;
  flex-shrink: 0;
}

.tooltip-detail-value {
  color: var(--color-text-primary);
  font-weight: 500;
}

.tooltip-divider {
  height: 1px;
  background: var(--color-border);
  margin: var(--space-2) 0;
}

.tooltip-links {
  display: flex;
  gap: var(--space-2);
}

.tooltip-link {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: var(--text-xs);
  color: var(--color-text-secondary);
  padding: 2px 6px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  transition: all var(--transition-fast);
  text-decoration: none;
}

.tooltip-link:hover {
  color: var(--color-accent);
  border-color: var(--color-accent-border);
  background: var(--color-accent-bg);
}

.tooltip-link svg {
  flex-shrink: 0;
}

@media (max-width: 768px) {
  .author-tooltip {
    left: 0;
    transform: none;
  }
}
</style>