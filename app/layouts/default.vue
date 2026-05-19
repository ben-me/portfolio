<template>
  <div>
    <header>
      <NavMenu orientation="horizontal" />
    </header>
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
  grid-template-rows: auto 1fr auto;

  header {
    z-index: 1;
    display: flex;
    justify-content: center;
    margin-block-start: 0.25rem;
  }

  main {
    position: relative;
  }
}
</style>
