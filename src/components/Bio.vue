<template>
  <section class="hero">
    <div class="hero-content">
      <h1 class="hero-name">
        <span class="hero-bold">ZeDong</span> Jia
      </h1>
      <p class="hero-text">Hi~👋 I am currently 1st graduate student at the <a href='https://www.insc.tsinghua.edu.cn' target='_blank'>Institute for Network Sciences and Cyberspace (INSC)</a> at Tsinghua University, advised by the <a href='https://helinhl.github.io/' target='_blank'>Associate Research Professor Lin He</a>, and under the leadership of <a href='https://www.insc.tsinghua.edu.cn/info/1157/2456.htm' target='_blank'>Prof. Ying Liu</a>.</p>
      <div class="hero-links">
        <a class="hero-link" href="mailto:jzd25@mails.tsinghua.edu.cn" title="Email">
          <Icon name="mail" />
          <span class="link-label">jzd25@mails.tsinghua.edu.cn</span>
        </a>
        <a class="hero-link" href="https://github.com/zedongjia" target="_blank" rel="noopener" title="GitHub">
          <Icon name="github" />
          <span class="link-label">github.com/zedongjia</span>
        </a>
      </div>
    </div>
  </section>
</template>

<script setup>
import Icon from './Icon.vue'
</script>

<style scoped>
.hero {
  padding: var(--space-4) 0 var(--space-2);
}

.hero-name {
  font-size: var(--text-3xl);
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
  margin-top: var(--space-2);
  font-size: var(--text-base);
  line-height: var(--leading-relaxed);
  color: var(--color-text-secondary);
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
  flex-wrap: wrap;
  gap: var(--space-2);
  margin-top: var(--space-3);
}

.hero-link {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-3);
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  background: var(--color-bg-card);
  transition: all var(--transition-normal);
}

.hero-link:hover {
  color: var(--color-accent);
  border-color: var(--color-accent-border);
  box-shadow: var(--shadow-sm);
  transform: translateY(-1px);
}

.hero-link :deep(svg) {
  width: 18px;
  height: 18px;
}

@media (max-width: 768px) {
  .hero-name {
    font-size: var(--text-2xl);
  }

  .link-label {
    display: none;
  }

  .hero-link {
    padding: var(--space-2);
  }
}
</style>