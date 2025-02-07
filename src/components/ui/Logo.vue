<template>
  <a href="/" target="_blank">
    <img src="/logo.svg" class="logo" alt="Logo - Mercado Bitcoin" />
    <span hidden>Mercado Bitcoin</span>
  </a>
</template>
<style scoped>
.logo {
  display: block;
  margin: 0 auto;
  height: 6em;
  padding: var(--gap-md);
  will-change: filter;
  transition: filter 300ms;

  &:hover {
    filter: drop-shadow(0 0 2em var(--brand));
  }
}
</style>
