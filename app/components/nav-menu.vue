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
const getRouteBaseName = useRouteBaseName();

const currentBaseName = computed(() => getRouteBaseName(route));
const navItems = computed(() => {
  if (currentBaseName.value === "index") {
    return pages.slice(1);
  }
  return pages;
});

const lastHoveredIndex = ref(0);
</script>

<template>
  <nav>
    <ul :class="props.orientation">
      <li
        v-for="(item, index) in navItems"
        :key="item.route"
      >
        <NuxtLinkLocale
          :to="item.name"
          :class="{
            'cursor-hover': orientation === 'vertical' && index === lastHoveredIndex,
          }"
          @mouseenter="lastHoveredIndex = index"
          @focus="lastHoveredIndex = index"
        >
          {{ $t(item.key) }}
        </Nuxtlinklocale>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
nav {
  width: 100%;
  font-family: var(--ff-mono);
  font-weight: 700;

  ul {
    display: flex;
    flex-wrap: wrap;
    list-style: none;
    padding: 0;
    margin: 0;

    &.vertical {
      flex-direction: column;
    }

    &.horizontal {
      width: 100%;
      justify-content: center;

      @media (--lg) {
        justify-content: space-around;
      }
    }
  }

  li {
    position: relative;
    text-align: center;
  }

  a {
    display: inline-block;
    font-family: "Jersey 10";
    color: var(--c-white);
    text-decoration: none;
    letter-spacing: 0.1em;
    padding-inline: 0.75rem;
    filter: var(--outline-light);
    transition: color 0.2s;
    font-size: var(--fs-2);

    &.router-link-active {
      color: var(--c-gold);
    }

    &:hover {
      color: var(--c-gold);
    }

    &:focus-visible {
      outline: 2px dashed var(--c-black);
    }

    @media (--lg) {
      &.router-link-active,
      &.cursor-hover {
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
