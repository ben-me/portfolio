<script setup lang="ts">
definePageMeta({ layout: "hero" });
</script>

<template>
  <div class="wrapper">
    <div class="hero">
      <h1>
        <span>Benedikt</span>
        <br>
        <span>Mehler</span>
      </h1>
      <h2>The power-up your next web project deserves.</h2>
    </div>
    <NuxtImg src="/herobg.webp" />
    <NavMenu />
  </div>
</template>

<style scoped>
.wrapper {
  display: grid;
  gap: 3rem;
  justify-items: center;
  max-width: 75rem;

  img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: -1;
  }

  nav {
    animation: fade var(--dur-fade) var(--ease-snap) var(--delay-menu) both;
  }
}

.hero {
  display: grid;
  gap: 2rem;
  text-align: center;
  place-items: center;

  h1 {
    text-transform: uppercase;
    font-family: "Jersey 10";
    line-height: 0.78;
    transform: skewX(-18deg);
    filter: var(--outline);
    width: max-content;

    @media --md {
      text-transform: lowercase;
    }

    span {
      display: inline-block;
      line-height: 0.6;
      background: linear-gradient(
        var(--c-green-500) 9%,
        var(--c-green-300) 10%,
        var(--c-green-300) 24%,
        var(--c-green-100) 25%,
        var(--c-green-100) 40%,
        var(--c-white) 40%,
        var(--c-white) 60%,
        var(--c-green-100) 60%,
        var(--c-green-100) 75%,
        var(--c-green-300) 75%,
        var(--c-green-300) 90%,
        var(--c-green-500) 90%
      );
      background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }

  h2 {
    font-family: "Jersey 10";
    line-height: 1;
    font-size: var(--fs-3);
    max-width: 30ch;
    color: var(--c-white);
    filter: var(--outline);
  }
}

.hero {
  h1 span {
    animation-duration: var(--dur-slide);
    animation-timing-function: var(--ease-snap);
    animation-fill-mode: both;

    &:first-of-type {
      animation-name: slide-in-left;
      animation-delay: var(--delay-word-1);
    }

    &:last-of-type {
      animation-name: slide-in-right;
      animation-delay: var(--delay-word-2);
    }
  }

  h2 {
    animation: fade var(--dur-fade) var(--ease-snap) var(--delay-subtitle) both;
  }
}

@keyframes slide-in-left {
  from {
    opacity: 0;
    transform: translateX(-120vw);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slide-in-right {
  from {
    opacity: 0;
    transform: translateX(120vw);
  }
  to {
    opacity: 1;
    transform: translateX(0);
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

@media (prefers-reduced-motion: reduce) {
  .hero h1 span,
  .hero h2,
  .wrapper nav,
  .wrapper.ready .hero h1 span,
  .wrapper.ready .hero h2,
  .wrapper nav {
    animation: none;
    opacity: 1;
  }
}
</style>
