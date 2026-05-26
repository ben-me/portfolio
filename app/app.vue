<script setup lang="ts">
import { deLocalizeHref } from "~/paraglide/runtime.js";

const transition = useState<{ name: string } | false>("page-transition", () => ({ name: "slide-left" }));

if (import.meta.client) {
  const router = useRouter();
  router.beforeEach((to, from) => {
    const toPath = deLocalizeHref(to.path);
    const fromPath = deLocalizeHref(from.path);
    if (toPath === fromPath) {
      transition.value = false;
      return;
    }
    const toIdx = pages.findIndex(page => page.route === toPath);
    const fromIdx = pages.findIndex(page => page.route === fromPath);
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
  <LanguageSwitcher />
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
