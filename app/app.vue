<template>
  <NuxtImg src="/herobg.webp" />
  <NuxtLayout>
    <NuxtPage />
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
