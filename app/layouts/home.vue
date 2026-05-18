<template>
  <div>
    <main>
      <slot />
    </main>
    <footer />
  </div>
</template>

<style scoped>
div {
  display: grid;
  grid-template-rows: 1fr auto;
  min-height: 100dvh;

  main {
    display: grid;
    place-items: center;
    padding-inline: 1rem;
  }
}
</style>
