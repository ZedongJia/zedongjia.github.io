<template>
  <NavBar page="publications" />
  <div id="wrapper">
    <section id="pub">
      <SectionTitle title="Publications" />
      <Pub />
    </section>
    <footer class="site-footer">
      <p>&copy; {{ year }} Zedong Jia. All rights reserved.<span v-if="lastUpdated"> · Last updated {{ lastUpdated }}</span></p>
    </footer>
  </div>
</template>

<script setup>
import NavBar from './components/NavBar.vue'
import SectionTitle from './components/SectionTitle.vue'
import Pub from './components/Pub.vue'

const year = new Date().getFullYear()
const lastUpdated = __LAST_UPDATED__
</script>

<style scoped>
#pub { scroll-margin-top: 70px; }

.site-footer {
  margin-top: var(--space-8);
  padding: var(--space-4) 0;
  border-top: 1px solid var(--color-divider);
  text-align: center;
  font-size: var(--text-meta);
  color: var(--color-text-muted);
}
</style>
