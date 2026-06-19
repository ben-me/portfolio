<script setup lang="ts">
const { locale } = useI18n();
const route = useRoute();

const newPath = computed(() => route.path);
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
      <NuxtLinkLocale v-if="locale === 'de' && newPath !== '/impressum'" to="impressum">
        Impressum
      </NuxtLinkLocale>
      <NuxtLinkLocale v-if="locale === 'de' && newPath !== '/datenschutz'" to="datenschutz">
        Datenschutz
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

main {
  padding-block: 1rem;
}

footer {
  animation: fade 0.5s ease 300ms both;
}

@keyframes fade {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
