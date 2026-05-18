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
  display: grid;
  grid-template-rows: auto 1fr auto;

  > header {
    display: flex;
    justify-content: center;
  }
}
</style>
