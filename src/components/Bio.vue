<template>
  <section class="hero">
    <aside class="hero-sidebar">
      <img v-if="profile.avatar" class="hero-avatar" :src="profile.avatar" :alt="`${profile.name} portrait`" />
      <div class="hero-links">
        <a v-if="profile.email" class="hero-link" :href="`mailto:${profile.email}`" aria-label="Email">
          <Icon name="mail" />
          <span>{{ profile.email }}</span>
        </a>
        <a v-for="link in socialLinks" :key="link.label" class="hero-link" :href="link.url" target="_blank" rel="noopener noreferrer" :aria-label="link.label">
          <Icon :name="link.icon" />
          <span>{{ link.label }}</span>
        </a>
      </div>
    </aside>
    <div class="hero-content">
      <h1 class="hero-name">
        <span class="hero-bold">{{ profile.given_name }}</span> {{ profile.family_name }}
      </h1>
      <p class="hero-role">{{ profile.title }} · <a :href="profile.affiliation_url" target="_blank" rel="noopener noreferrer">{{ profile.affiliation }}</a></p>
      <p class="hero-text">{{ profile.bio }}</p>
    </div>
    <section class="research-section">
      <h2 class="sr-only">Research Interests</h2>
      <p class="research-lede">My research interests span:</p>
      <Int compact class="research-list-profile" />
    </section>
    <div v-if="profile.advisor_name || profile.leader_name || profile.availability || profile.lab_name" class="hero-notes">
      <p v-if="profile.advisor_name || profile.leader_name" class="hero-advisors">
        <template v-if="profile.advisor_name">
          Advised by <a v-if="profile.advisor_url" :href="profile.advisor_url" target="_blank" rel="noopener noreferrer">{{ profile.advisor_name }}</a><span v-else>{{ profile.advisor_name }}</span>
        </template>
        <template v-if="profile.advisor_name && profile.leader_name">, and </template>
        <template v-if="profile.leader_name">
          under the leadership of <a v-if="profile.leader_url" :href="profile.leader_url" target="_blank" rel="noopener noreferrer">{{ profile.leader_name }}</a><span v-else>{{ profile.leader_name }}</span>
        </template>.
      </p>
      <p v-if="profile.availability" class="hero-availability">{{ profile.availability }}</p>
      <p v-if="profile.lab_name" class="hero-lab">
        I am also a member of <a v-if="profile.lab_url" :href="profile.lab_url" target="_blank" rel="noopener noreferrer">{{ profile.lab_name }}</a><span v-else>{{ profile.lab_name }}</span><template v-if="profile.lab_description">, a {{ profile.lab_description }} lab</template>.
      </p>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import Icon from './Icon.vue'
import profile from '../data/profile.yaml'
import Int from './Int.vue'

const socialLinks = computed(() => [
  { label: 'GitHub', url: profile.github, icon: 'github' },
  { label: 'CV', url: profile.cv, icon: 'paper' },
  { label: 'Google Scholar', url: profile.scholar, icon: 'globe' },
  { label: 'ORCID', url: profile.orcid, icon: 'orcid' },
  { label: 'DBLP', url: profile.dblp, icon: 'globe' },
].filter(link => link.url))
</script>

<style scoped>
.hero {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  column-gap: var(--space-5);
  row-gap: 0;
  padding: var(--space-2) 0 0;
}

.hero-sidebar {
  display: flex;
  flex: 0 0 140px;
  flex-direction: column;
  gap: var(--space-3);
}

.hero-avatar {
  width: 84px;
  height: 84px;
  align-self: center;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-full);
  object-fit: cover;
  flex-shrink: 0;
}

.hero-content { flex: 1; min-width: 0; }

.research-section,
.hero-notes {
  flex-basis: 100%;
}

.hero-name {
  font-size: var(--text-heading-1);
  font-weight: 300;
  letter-spacing: -0.03em;
  line-height: var(--leading-tight);
  color: var(--color-text-primary);
}

.hero-bold {
  font-weight: 800;
  background: linear-gradient(135deg, var(--color-accent), var(--color-accent-light));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-text {
  margin-top: var(--space-content-tight);
  font-size: var(--text-base);
  line-height: var(--leading-content);
  color: var(--color-text-secondary);
}

.hero-role,
.hero-availability,
.hero-advisors,
.hero-lab {
  margin-top: var(--space-content-tight);
  font-size: var(--text-sm);
  line-height: var(--leading-content);
  color: var(--color-text-secondary);
}

.hero-role :deep(a) {
  color: inherit;
  text-decoration: underline;
  text-underline-offset: 2px;
}

.hero-advisors :deep(a) {
  color: var(--color-accent);
  text-decoration: underline;
  text-underline-offset: 2px;
}

.hero-lab :deep(a) {
  color: var(--color-accent);
  text-decoration: underline;
  text-underline-offset: 2px;
}

.hero-text :deep(a) {
  color: var(--color-accent);
  text-decoration: underline;
  text-decoration-color: var(--color-accent-border);
  text-underline-offset: 2px;
  transition: all var(--transition-fast);
}

.hero-text :deep(a:hover) {
  text-decoration-color: var(--color-accent);
}

.hero-links {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: var(--space-1);
}

.research-section {
  margin-top: var(--space-2);
}

.hero-notes { margin-top: var(--space-2); }

.research-lede {
  margin-bottom: var(--space-content-tight);
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
}

.research-list-profile :deep(.research-list) { gap: var(--space-3); }
.research-list-profile :deep(.interest-item) { padding: var(--space-micro) 0; }
.research-list-profile :deep(.interest-text) { font-size: var(--text-sm); }

.hero-link {
  display: inline-flex;
  align-items: center;
  gap: var(--space-inline);
  padding: 0;
  font-size: var(--text-meta);
  color: var(--color-text-secondary);
  transition: color var(--transition-fast);
}

.hero-link:hover {
  color: var(--color-accent);
}

.hero-link :deep(svg) {
  width: 14px;
  height: 14px;
}

@media (max-width: 768px) {
  .hero { column-gap: var(--space-3); }
  .hero-sidebar { flex-basis: auto; }
  .hero-avatar {
    width: 58px;
    height: 58px;
  }
  .hero-name {
    font-size: var(--text-2xl);
  }

  .hero-links { gap: var(--space-1); }
  .hero-link span { display: none; }

}
</style>
