<template>
  <button class="theme-toggle" @click="toggleTheme" :title="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
    aria-label="Toggle theme">
    <Transition name="theme-icon" mode="out-in">
      <Icon :key="isDark ? 'moon' : 'sun'" :name="isDark ? 'moon' : 'sun'" />
    </Transition>
  </button>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Icon from './Icon.vue'

const isDark = ref(false)

onMounted(() => {
  const stored = localStorage.getItem('theme')
  if (stored) {
    isDark.value = stored === 'dark'
  } else {
    isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
  }
  applyTheme()
})

function toggleTheme() {
  isDark.value = !isDark.value
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
  applyTheme()
}

function applyTheme() {
  document.documentElement.setAttribute('data-theme', isDark.value ? 'dark' : 'light')
}
</script>

<style scoped>
.theme-toggle {
  position: fixed;
  top: var(--space-4);
  right: var(--space-4);
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-full);
  background: var(--color-bg-card);
  color: var(--color-text-secondary);
  cursor: pointer;
  box-shadow: var(--shadow-sm);
  transition: all var(--transition-normal);
}

.theme-toggle:hover {
  color: var(--color-accent);
  border-color: var(--color-accent-border);
  box-shadow: var(--shadow-md);
  transform: scale(1.05);
}

.theme-toggle :deep(svg) {
  width: 18px;
  height: 18px;
}

.theme-icon-enter-active,
.theme-icon-leave-active {
  transition: all 200ms ease;
}

.theme-icon-enter-from {
  opacity: 0;
  transform: rotate(-90deg) scale(0.5);
}

.theme-icon-leave-to {
  opacity: 0;
  transform: rotate(90deg) scale(0.5);
}
</style>