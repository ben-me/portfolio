<script setup lang="ts">
import type { TransitionProps } from "vue";

const transition = ref<TransitionProps | false>({ name: "slide-left" });

useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - Ben M` : "Ben - M";
  },
});

const head = useLocaleHead();

if (import.meta.client) {
  const router = useRouter();
  const getRouteBaseName = useRouteBaseName();
  router.beforeEach((to, from) => {
    const toName = getRouteBaseName(to);
    const fromName = getRouteBaseName(from);
    if (toName === fromName) {
      transition.value = false;
      return;
    }
    const toIdx = pages.findIndex(page => page.name === toName);
    const fromIdx = pages.findIndex(page => page.name === fromName);
    if (toIdx === -1 || fromIdx === -1)
      return;
    transition.value = { name: toIdx < fromIdx ? "slide-right" : "slide-left" };
  });
}
</script>

<template>
  <Html :dir="head.htmlAttrs.dir" :lang="head.htmlAttrs.lang">
    <NuxtImg src="/img/herobg.webp" />
    <NuxtLayout>
      <NuxtPage :transition="transition" />
    </NuxtLayout>
    <ClientOnly>
      <Notification />
    </ClientOnly>
    <LanguageSwitcher />
  </Html>
</template>

<style scoped>
img {
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
}
</style>
