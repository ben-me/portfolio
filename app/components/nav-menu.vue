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
</script>

<template>
  <nav :class="props.orientation">
    <ul>
      <li v-for="(item) in navItems" :key="item.route">
        <NuxtLink
          :to="item.route"
          :class="{
            'is-active':
              props.orientation === 'horizontal' && route.path === item.route,
          }"
        >
          <span class="cursor" aria-hidden="true">▶</span>
          <span>{{ item.label }}</span>
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

  &.vertical ul {
    flex-direction: column;
    align-items: center;
    gap: 0.35rem;
  }

  &.horizontal {
    display: flex;
    width: 100%;

    ul {
      width: 100%;
      flex-wrap: wrap;
      justify-content: center;
      gap: 0.75rem;

      @media (--md) {
        justify-content: space-around;
      }
    }
  }
  a {
    display: flex;
    gap: 0.4rem;
    text-decoration: none;
    padding: 0.35rem 0.5rem;
    color: var(--c-black);
    transition: all 0.2s;

    @media (--md) {
      padding: 0.45rem 1.25rem 0.45rem 0.75rem;
    }

    span {
      line-height: 1;

      &:first-child {
        transition: all 0.2s;
        color: var(--c-gold);
        visibility: hidden;
        opacity: 0;
      }
    }

    &.is-active .cursor,
    &:hover .cursor,
    &.is-focused .cursor {
      visibility: visible;
      opacity: 1;
    }

    &.is-active {
      background: var(--c-gold);
      color: var(--c-ink-900);
      box-shadow:
        inset 2px 2px 0 0 color-mix(in oklab, var(--c-gold) 70%, white),
        inset -2px -2px 0 0 color-mix(in oklab, var(--c-gold) 60%, black);

      .cursor {
        color: var(--c-ink-900);
      }
    }

    &:not(.is-active):hover,
    &.is-focused:not(.is-active) {
      color: var(--c-gold);
    }

    &:focus-visible {
      outline: 2px dashed var(--c-gold);
      outline-offset: 2px;
    }
  }
}
</style>
