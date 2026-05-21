<script setup lang="ts">
definePageMeta({ layout: "home", layoutTransition: { name: "home" } });
</script>

<template>
  <section>
    <div class="hero">
      <h1>
        <span>Benedikt</span>
        <br>
        <span>Mehler</span>
      </h1>
      <h2>The power-up your next web project deserves.</h2>
    </div>
    <NavMenu />
  </section>
</template>

<style scoped>
section {
  --ease-snap: cubic-bezier(0.16, 1, 0.3, 1);
  --dur-slide: 0.5s;
  --dur-fade: 0.5s;
  --delay-word-1: 0.4s;
  --delay-word-2: 0.8s;
  --delay-subtitle: 1.5s;
  --delay-menu: 2s;

  display: grid;
  gap: 3rem;
  justify-items: center;
  max-width: 75rem;

  @media (prefers-reduced-motion: no-preference) {
    nav {
      animation: fade var(--dur-fade) var(--ease-snap) var(--delay-menu) both;
    }
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

      @media (prefers-reduced-motion: no-preference) {
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
    }
  }

  h2 {
    font-family: "Jersey 10";
    line-height: 1;
    font-size: var(--fs-3);
    max-width: 30ch;
    color: var(--c-white);
    filter: var(--outline);

    @media (prefers-reduced-motion: no-preference) {
      animation: fade var(--dur-fade) var(--ease-snap) var(--delay-subtitle) both;
    }
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
</style>
