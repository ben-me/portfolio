<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    orientation?: "vertical" | "horizontal";
  }>(),
  {
    orientation: "vertical",
  },
);

const route = useRoute();
const navItems = computed(() => {
  if (route.path === "/") {
    return pages.slice(1);
  }
  return pages;
});

const lastHoveredIndex = ref(0);
</script>

<template>
  <nav :class="props.orientation">
    <ul>
      <li
        v-for="(item, index) in navItems"
        :key="item.route"
      >
        <NuxtLink
          :to="item.route"
          :class="{
            'is-active':
              props.orientation === 'horizontal' && route.path === item.route,
            'cursor-hover': index === lastHoveredIndex,
          }"
          @mouseenter="lastHoveredIndex = index"
          @focus="lastHoveredIndex = index"
        >
          {{ item.label }}
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
nav {
  font-family: var(--ff-mono);
  font-weight: 700;

  ul {
    display: flex;
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    position: relative;
    text-align: center;
  }

  a {
    text-decoration: none;
    padding: 0.25rem 0.5rem;

    &:hover {
      color: var(--c-gold);
    }

    &:focus-visible {
      outline: 2px dashed var(--c-black);
    }
  }

  &.vertical {
    ul {
      flex-direction: column;
      gap: 0.15rem;
    }

    a {
      font-family: "Jersey 10";
      font-size: var(--fs-1);
      color: var(--c-white);
      filter: var(--outline-light);
      letter-spacing: 0.1em;
      transition: color 0.2s;
      color: var(--c-gold);
    }

    @media (--lg) {
      a {
        color: var(--c-white);
      }

      .cursor-hover {
        color: var(--c-gold);

        &::before {
          content: "▶";
          position: absolute;
          left: -1rem;
          top: 50%;
          width: 0.65rem;
          height: 0.8rem;
          clip-path: polygon(0 0, 100% 50%, 0 100%);
          background: var(--c-gold);

          @media (prefers-reduced-motion: no-preference) {
            animation: nav-cursor 1s ease-in-out infinite;
          }
        }
      }
    }
  }

  &.horizontal {
    display: flex;
    width: 100%;

    ul {
      width: 100%;
      flex-wrap: wrap;
      justify-content: center;
      gap: 0.75rem;

      @media (--lg) {
        justify-content: space-around;
      }

      a {
        color: var(--c-black);

        @media (--lg) {
          padding: 0.25rem 1rem;
        }

        &.is-active {
          background: var(--c-gold);
          box-shadow:
            inset 2px 2px 0 0 color-mix(in oklab, var(--c-gold) 70%, white),
            inset -2px -2px 0 0 color-mix(in oklab, var(--c-gold) 60%, black);
        }
      }
    }
  }
}

@keyframes nav-cursor {
  0% {
    transform: translate(-3px, -50%);
  }
  50% {
    transform: translate(3px, -50%);
  }
  100% {
    transform: translate(-3px, -50%);
  }
}
</style>
