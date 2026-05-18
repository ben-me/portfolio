<script setup lang="ts">
import { pageOrder } from "~/middleware/page-transition.global";

const props = withDefaults(
  defineProps<{
    orientation?: "vertical" | "horizontal";
  }>(),
  {
    orientation: "vertical",
  },
);

const route = useRoute();
const items = computed(() =>
  pageOrder.filter(
    p => p.route !== "/" || props.orientation === "horizontal",
  ),
);

const routeIndex = computed(() =>
  items.value.findIndex(page => page.route === route.path),
);
const keyboardIndex = ref<number | null>(null);
const focusIndex = computed(() => keyboardIndex.value ?? routeIndex.value);

function onKey(e: KeyboardEvent) {
  const nextKeys
    = props.orientation === "vertical"
      ? ["ArrowDown", "j"]
      : ["ArrowRight", "l"];
  const prevKeys
    = props.orientation === "vertical"
      ? ["ArrowUp", "k"]
      : ["ArrowLeft", "h"];

  const current = focusIndex.value;

  if (nextKeys.includes(e.key)) {
    keyboardIndex.value = (Math.max(current, -1) + 1) % items.value.length;
    e.preventDefault();
  }
  else if (prevKeys.includes(e.key)) {
    keyboardIndex.value
      = (current - 1 + items.value.length) % items.value.length;
    e.preventDefault();
  }
  else if (e.key === "Enter") {
    const target = items.value[current];
    if (target) {
      navigateTo(target.route);
      keyboardIndex.value = null;
    }
  }
}

onMounted(() => {
  window.addEventListener("keydown", onKey);
});

onBeforeUnmount(() => {
  window.removeEventListener("keydown", onKey);
});
</script>

<template>
  <nav :class="orientation">
    <ul>
      <li v-for="(item, i) in items" :key="item.route">
        <NuxtLink
          :to="item.route"
          :class="{
            'is-active': route.path === item.route,
            'is-focused': focusIndex === i,
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
      justify-content: space-around;
    }
  }

  a {
    display: flex;
    gap: 0.6rem;
    text-decoration: none;
    padding: 0.45rem 2.5rem 0.45rem 0.75rem;
    color: black;

    span {
      line-height: 1;

      &:first-child {
        color: var(--c-gold);
        visibility: hidden;
      }
    }

    &.is-active {
      background: var(--c-gold);
      color: var(--c-ink-900);
      filter: none;
      box-shadow:
        inset 2px 2px 0 0 color-mix(in oklab, var(--c-gold) 70%, white),
        inset -2px -2px 0 0 color-mix(in oklab, var(--c-gold) 60%, black);

      .cursor {
        visibility: visible;
        color: var(--c-ink-900);
      }
    }

    &:not(.is-active):hover,
    &.is-focused:not(.is-active) {
      color: var(--c-gold);

      .cursor {
        visibility: visible;
      }
    }

    &:focus-visible {
      outline: 2px dashed var(--c-gold);
      outline-offset: 2px;
    }
  }
}

@media (prefers-reduced-motion: reduce) {
  nav a.is-active .cursor {
    animation: none;
  }
}
</style>
