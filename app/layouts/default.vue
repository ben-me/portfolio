<script setup lang="ts">
const { locale } = useI18n();
</script>

<template>
  <div>
    <header>
      <NavMenu orientation="horizontal" />
    </header>
    <main>
      <slot />
    </main>
    <footer>
      <NuxtLinkLocale v-if="locale === 'de'" to="impressum">
        Impressum
      </NuxtLinkLocale>
    </footer>
  </div>
</template>

<style scoped>
div {
  height: 100dvh;
  display: grid;
  grid-template-rows: auto 1fr auto;
  overflow-x: hidden;
}

header {
  z-index: 1;
  margin-block: 0.25rem;
}

footer {
  a {
    color: black;
  }
}
</style>
