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
</style>
