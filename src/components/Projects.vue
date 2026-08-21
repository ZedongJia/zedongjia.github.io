<template>
  <div class="project-list">
    <article v-for="project in projects" :key="project.name" class="project-item">
      <div>
        <a v-if="project.url" class="project-name" :href="project.url" target="_blank" rel="noopener noreferrer">{{ project.name }}</a>
        <h3 v-else class="project-name">{{ project.name }}</h3>
        <p v-if="project.description">{{ project.description }}</p>
      </div>
      <div v-if="project.code || project.paper" class="project-links">
        <a v-if="project.code" :href="project.code" target="_blank" rel="noopener noreferrer">Code</a>
        <a v-if="project.paper" :href="project.paper" target="_blank" rel="noopener noreferrer">Paper</a>
      </div>
    </article>
  </div>
</template>

<script setup>
import projects from '../data/projects.yaml'
</script>

<style scoped>
.project-list { display: grid; gap: var(--space-2); }
.project-item { display: flex; align-items: start; justify-content: space-between; gap: var(--space-3); padding: var(--space-2) var(--space-3); border: 1px solid var(--color-border); border-radius: var(--radius-md); background: var(--color-bg-card); }
.project-name { display: block; font-size: var(--text-sm); font-weight: 700; color: var(--color-text-primary); }
.project-name:hover { color: var(--color-accent); }
.project-item p { margin-top: var(--space-micro); color: var(--color-text-secondary); font-size: var(--text-sm); }
.project-links { display: flex; gap: var(--space-2); flex-shrink: 0; font-size: var(--text-xs); }
</style>
