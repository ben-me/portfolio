<script setup lang="ts">
const { locale } = useI18n();
</script>

<template>
  <div>
    <main>
      <slot />
    </main>
    <footer>
      <NuxtLinkLocale v-if="locale === 'de'" to="impressum">
        Impressum
      </NuxtLinkLocale>
      <NuxtLinkLocale v-if="locale === 'de'" to="datenschutz">
        Datenschutz
      </NuxtLinkLocale>
    </footer>
  </div>
</template>

<style scoped>
div {
  height: 100dvh;
  display: grid;
  grid-template-rows: 1fr auto;
}

main {
  display: grid;
  place-items: center;
}

footer {
  animation: fade 0.5s cubic-bezier(0.16, 1, 0.3, 1) 4s both;

  a {
    text-decoration: none;
    color: var(--c-black);
  }
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
