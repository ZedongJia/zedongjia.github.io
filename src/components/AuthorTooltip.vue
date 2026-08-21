<template>
  <span class="author-hover-wrapper" @mouseenter="show" @mouseleave="hide" @focusin="show" @focusout="handleFocusOut">
    <a v-if="info.homepage" class="author-link" :class="{ 'author-highlight': isMe }" :href="info.homepage" target="_blank" rel="noopener noreferrer" :title="`Visit ${displayName}'s homepage`"><slot></slot></a>
    <strong v-else-if="isMe" class="author-highlight"><slot></slot></strong>
    <span v-else class="author-static" tabindex="0"><slot></slot></span>
    <div v-if="visible" class="author-tooltip" role="tooltip" :aria-label="`${displayName} profile`">
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
    </div>
  </span>
</template>

<script setup>
import { ref } from 'vue'

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

function handleFocusOut(event) {
  if (!event.currentTarget.contains(event.relatedTarget)) {
    hide()
  }
}
</script>

<style scoped>
.author-hover-wrapper {
  position: relative;
  display: inline-block;
}

.author-highlight {
  font-weight: 700;
  color: var(--color-accent);
  font-style: normal;
}

.author-link {
  padding: 0;
  border: 0;
  background: transparent;
  color: var(--color-accent);
  font: inherit;
  font-style: inherit;
  line-height: inherit;
  cursor: pointer;
  transition: color var(--transition-fast);
  text-decoration: none;
}

.author-hover-wrapper:hover .author-link,
.author-link:focus-visible {
  color: var(--color-accent-light);
  text-decoration: underline;
  text-decoration-thickness: 1px;
  text-underline-offset: 2px;
}

.author-link:focus-visible { outline: 2px solid var(--color-accent-border); outline-offset: 2px; border-radius: 2px; }

.author-static:focus-visible { outline: 2px solid var(--color-accent-border); outline-offset: 2px; border-radius: 2px; }

.author-tooltip {
  position: absolute;
  top: calc(100% + 6px);
  left: 0;
  width: max-content;
  max-width: min(300px, calc(100vw - 32px));
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-card-hover);
  padding: var(--space-2);
  z-index: 1000;
  white-space: normal;
  font-style: normal;
  animation: tooltip-enter var(--transition-fast) both;
}

.tooltip-header {
  margin-bottom: var(--space-1);
}

.tooltip-name {
  font-size: var(--text-sm);
  font-weight: 700;
  color: var(--color-text-primary);
  line-height: 1.3;
}

.tooltip-title {
  font-size: var(--text-xs);
  color: var(--color-accent);
  font-weight: 600;
  margin-top: var(--space-micro);
}

.tooltip-details {
  display: flex;
  flex-direction: column;
  gap: var(--space-inline);
}

.tooltip-detail-row {
  display: flex;
  align-items: baseline;
  gap: var(--space-2);
  font-size: var(--text-xs);
  line-height: 1.4;
}

.tooltip-detail-label {
  color: var(--color-text-muted);
  font-size: var(--text-xs);
  min-width: 48px;
  flex-shrink: 0;
}

.tooltip-detail-value {
  color: var(--color-text-primary);
  font-weight: 500;
}

@keyframes tooltip-enter {
  from { opacity: 0; transform: translateY(-3px); }
  to { opacity: 1; transform: translateY(0); }
}

@media (max-width: 768px) {
  .author-tooltip {
    max-width: min(280px, calc(100vw - 24px));
  }
}
</style>
