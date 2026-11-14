<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header class="site-header">
    <RouterLink to="/" class="brand">Fisherman</RouterLink>
  </header>
  <main class="page">
    <RouterView />
  </main>
</template>

<style>
:root {
  --sky-50: #f0f9ff;
  --sky-100: #e0f2fe;
  --sky-300: #7dd3fc;
  --sky-500: #0ea5e9;
  --sky-700: #0369a1;
  --sky-900: #0c4a6e;
  --ink: #0c2a3d;

  --font-body: "Avenir Next", "Segoe UI", system-ui, -apple-system, sans-serif;
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

html,
body {
  margin: 0;
  min-height: 100%;
}

body {
  background: linear-gradient(180deg, var(--sky-100) 0%, var(--sky-50) 45%);
  background-attachment: fixed;
  color: var(--ink);
  font-family: var(--font-body);
  font-size: 1.0625rem;
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
}

:focus-visible {
  outline: 3px solid var(--sky-500);
  outline-offset: 3px;
}
</style>

<style scoped>
.site-header {
  display: flex;
  align-items: center;
  padding: 1rem clamp(1.25rem, 5vw, 3rem);
  background: var(--sky-500);
  box-shadow: 0 1px 0 var(--sky-300);
}

.brand {
  color: #fff;
  font-size: 1.35rem;
  font-weight: 700;
  letter-spacing: -0.01em;
  text-decoration: none;
}

.page {
  max-width: 68rem;
  margin: 0 auto;
  padding: clamp(2rem, 6vw, 5rem) clamp(1.25rem, 5vw, 3rem);
}

.page-title {
  margin: 0 0 1rem;
  font-weight: 700;
  line-height: 1.05;
  letter-spacing: -0.03em;
  color: var(--sky-900);
}

.dashboard-link {
  color: var(--sky-700);
  font-weight: 600;
}

.dashboard-link:hover {
  color: var(--sky-900);
}
</style>
