<template>
  <nav class="navbar" :class="{ scrolled }">
    <div class="navbar-inner">
      <a class="navbar-brand" href="#" @click.prevent="scrollToTop">Zedong Jia</a>
      <div class="navbar-links">
        <a v-for="item in navItems" :key="item.id"
           :href="'#' + item.id"
           class="navbar-link"
           :class="{ active: activeSection === item.id }"
           @click.prevent="scrollTo(item.id)">
          {{ item.label }}
        </a>
        <button class="theme-btn" @click="toggleTheme" :title="isDark ? 'Light mode' : 'Dark mode'">
          <Icon :name="isDark ? 'sun' : 'moon'" />
        </button>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import Icon from './Icon.vue'

const navItems = [
  { id: 'bio', label: 'Bio' },
  { id: 'edu', label: 'Education' },
  { id: 'int', label: 'Interests' },
  { id: 'lab', label: 'Labs' },
  { id: 'pub', label: 'Publications' },
]

const isDark = ref(false)
const scrolled = ref(false)
const activeSection = ref('bio')

function toggleTheme() {
  isDark.value = !isDark.value
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
  applyTheme()
}

function applyTheme() {
  document.documentElement.setAttribute('data-theme', isDark.value ? 'dark' : 'light')
}

function scrollTo(id) {
  const el = document.getElementById(id)
  if (el) {
    const offset = 70
    const top = el.getBoundingClientRect().top + window.scrollY - offset
    window.scrollTo({ top, behavior: 'smooth' })
  }
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function onScroll() {
  scrolled.value = window.scrollY > 10

  const sections = navItems.map(item => ({
    id: item.id,
    el: document.getElementById(item.id),
  })).filter(s => s.el)

  for (let i = sections.length - 1; i >= 0; i--) {
    const rect = sections[i].el.getBoundingClientRect()
    if (rect.top <= 100) {
      activeSection.value = sections[i].id
      return
    }
  }
  activeSection.value = sections[0]?.id || ''
}

onMounted(() => {
  const stored = localStorage.getItem('theme')
  if (stored) {
    isDark.value = stored === 'dark'
  } else {
    isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
  }
  applyTheme()
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  height: 52px;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  background: rgba(250, 250, 250, 0.75);
  border-bottom: 1px solid transparent;
  transition: all var(--transition-normal);
}

[data-theme="dark"] .navbar {
  background: rgba(15, 15, 26, 0.75);
}

.navbar.scrolled {
  border-bottom-color: var(--color-border);
  box-shadow: var(--shadow-sm);
}

.navbar-inner {
  max-width: var(--max-width);
  margin: 0 auto;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 var(--space-4);
}

.navbar-brand {
  font-size: var(--text-sm);
  font-weight: 700;
  color: var(--color-text-primary);
  letter-spacing: -0.02em;
  cursor: pointer;
  transition: color var(--transition-fast);
}

.navbar-brand:hover {
  color: var(--color-accent);
}

.navbar-links {
  display: flex;
  align-items: center;
  gap: var(--space-1);
}

.navbar-link {
  padding: var(--space-1) var(--space-2);
  font-size: var(--text-xs);
  font-weight: 500;
  color: var(--color-text-muted);
  border-radius: var(--radius-sm);
  transition: all var(--transition-fast);
  white-space: nowrap;
}

.navbar-link:hover {
  color: var(--color-text-primary);
  background: var(--color-accent-bg);
}

.navbar-link.active {
  color: var(--color-accent);
  font-weight: 600;
}

.theme-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  margin-left: var(--space-1);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-full);
  background: transparent;
  color: var(--color-text-muted);
  cursor: pointer;
  transition: all var(--transition-normal);
}

.theme-btn:hover {
  color: var(--color-accent);
  border-color: var(--color-accent-border);
}

.theme-btn :deep(svg) {
  width: 14px;
  height: 14px;
}

@media (max-width: 768px) {
  .navbar-link {
    font-size: 0.65rem;
    padding: var(--space-1) var(--space-1);
  }
  .navbar-brand {
    font-size: var(--text-xs);
  }
}
</style>