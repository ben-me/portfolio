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
      <h2>
        <span aria-hidden="true">The power-up your next web project deserves.</span>
        <span>The power-up your next web project deserves.</span>
      </h2>
    </div>
    <p class="press-start">
      — PRESS START —
    </p>
    <NavMenu />
  </section>
</template>

<style scoped>
section {
  display: grid;
  gap: 1rem;
  justify-items: center;
  max-width: 75rem;

  @media (prefers-reduced-motion: no-preference) {
    nav {
      animation: fade 0.5s cubic-bezier(0.16, 1, 0.3, 1) 3.2s both;
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
        animation-duration: 0.5s;
        animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
        animation-fill-mode: both;

        &:first-of-type {
          animation-name: slide-in-left;
          animation-delay: 0.4s;
        }

        &:last-of-type {
          animation-name: slide-in-right;
          animation-delay: 0.8s;
        }
      }
    }
  }

  h2 {
    font-family: "Jersey 10";
    font-size: var(--fs-3);
    max-width: 30ch;
    display: grid;
    filter: var(--outline-light);
    color: var(--c-white);

    span {
      grid-area: 1 / 1;

      @media (prefers-reduced-motion: no-preference) {
        animation-duration: 0.8s;
        animation-timing-function: ease-in;
        animation-fill-mode: both;
        animation-delay: 1.5s;

        &:first-child {
          animation-name: slide-in-left;
        }

        &:last-child {
          animation-name: slide-in-right;
        }
      }
    }
  }
}

p {
  font-family: "Jersey 15";
  font-size: var(--fs-0);
  color: hsl(from var(--c-black) h s l / 0.6);

  @media (prefers-reduced-motion: no-preference) {
    opacity: 0;
    animation: press-start-blink 2s linear 3.8s infinite;
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

@keyframes press-start-blink {
  0%,
  49.9% {
    opacity: 1;
  }
  50%,
  100% {
    opacity: 0;
  }
}
</style>
