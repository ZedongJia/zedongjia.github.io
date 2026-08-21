<template>
  <NavBar />
  <div id="wrapper">
    <section id="bio"><Bio /></section>
    <section id="experience">
      <SectionTitle title="Experience" />
      <Edu />
    </section>
    <section id="patents">
      <SectionTitle title="Patents" />
      <Patents />
    </section>
    <section id="events">
      <SectionTitle title="Events" />
      <Events />
    </section>
    <footer class="site-footer">
      <p>&copy; {{ year }} Zedong Jia. All rights reserved.<span v-if="lastUpdated"> · Last updated {{ lastUpdated }}</span></p>
    </footer>
  </div>
</template>

<script setup>
import NavBar from './components/NavBar.vue'
import SectionTitle from './components/SectionTitle.vue'
import Bio from './components/Bio.vue'
import Edu from './components/Edu.vue'
import Patents from './components/Patents.vue'
import Events from './components/Events.vue'

const year = new Date().getFullYear()
const lastUpdated = __LAST_UPDATED__
</script>

<style scoped>
section {
  scroll-margin-top: 70px;
}

#wrapper > section:not(#bio) {
  margin-top: var(--space-section);
}

.site-footer {
  margin-top: var(--space-8);
  padding: var(--space-4) 0;
  border-top: 1px solid var(--color-divider);
  text-align: center;
  font-size: var(--text-xs);
  color: var(--color-text-muted);
}
</style>
