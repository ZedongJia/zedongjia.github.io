<template>
  <NavBar />
  <div id="wrapper">
    <section id="bio"><Bio /></section>
    <section id="edu">
      <SectionTitle title="Educations" />
      <Edu />
    </section>
    <section id="int">
      <SectionTitle title="Research Interests" />
      <Int />
    </section>
    <section id="lab">
      <SectionTitle title="Laboratories" />
      <Lab />
    </section>
    <section id="pub">
      <SectionTitle title="Publications" />
      <Pub />
    </section>
    <footer class="site-footer">
      <p>&copy; {{ year }} Zedong Jia. All rights reserved.</p>
    </footer>
  </div>
</template>

<script setup>
import NavBar from './components/NavBar.vue'
import SectionTitle from './components/SectionTitle.vue'
import Bio from './components/Bio.vue'
import Edu from './components/Edu.vue'
import Int from './components/Int.vue'
import Lab from './components/Lab.vue'
import Pub from './components/Pub.vue'

const year = new Date().getFullYear()
</script>

<style scoped>
section {
  scroll-margin-top: 70px;
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