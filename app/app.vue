<script setup lang="ts">
const transition = useState("page-transition", () => ({ name: "slide-left" }));

if (import.meta.client) {
  const router = useRouter();
  router.beforeEach((to, from) => {
    const toIdx = pages.findIndex(page => page.route === to.path);
    const fromIdx = pages.findIndex(page => page.route === from.path);
    if (toIdx === -1 || fromIdx === -1)
      return;
    transition.value = { name: toIdx < fromIdx ? "slide-right" : "slide-left" };
  });
}
</script>

<template>
  <NuxtImg src="/img/herobg.webp" />
  <NuxtLayout>
    <NuxtPage :transition="transition" />
  </NuxtLayout>
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
