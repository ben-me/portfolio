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
  position: absolute;
  inset: 0;
  display: grid;
  grid-template-rows: 1fr auto;

  main {
    display: grid;
    place-items: center;
    padding-inline: 1rem;
  }
}
</style>
