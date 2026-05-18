<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    orientation?: "vertical" | "horizontal";
  }>(),
  {
    orientation: "vertical",
  },
);

const items = [
  { label: "Projects", to: "/projects" },
  { label: "About", to: "/about" },
  { label: "Blog", to: "/blog" },
  { label: "Contact", to: "/contact" },
];

const activeIndex = ref(0);
const canHover = ref(true);

function onKey(e: KeyboardEvent) {
  const nextKeys
    = props.orientation === "vertical"
      ? ["ArrowDown", "j"]
      : ["ArrowRight", "l"];
  const prevKeys
    = props.orientation === "vertical"
      ? ["ArrowUp", "k"]
      : ["ArrowLeft", "h"];

  if (nextKeys.includes(e.key)) {
    activeIndex.value = (Math.max(activeIndex.value, -1) + 1) % items.length;
    e.preventDefault();
  }
  else if (prevKeys.includes(e.key)) {
    activeIndex.value
      = (activeIndex.value - 1 + items.length) % items.length;
    e.preventDefault();
  }
  else if (e.key === "Enter") {
    const target = items[activeIndex.value];
    if (target)
      navigateTo(target.to);
  }
}

onMounted(() => {
  const mq = window.matchMedia("(hover: hover)");
  canHover.value = mq.matches;
  if (!mq.matches)
    activeIndex.value = -1;
  window.addEventListener("keydown", onKey);
});
onBeforeUnmount(() => {
  window.removeEventListener("keydown", onKey);
});
</script>

<template>
  <nav :class="orientation">
    <ul>
      <li
        v-for="(item, i) in items"
        :key="item.to"
        :class="{ 'is-active': activeIndex === i }"
        @mouseenter="canHover && (activeIndex = i)"
        @focusin="activeIndex = i"
      >
        <NuxtLink :to="item.to">
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

  li {
    a {
      display: flex;
      align-items: baseline;
      gap: 0.6rem;
      font: inherit;
      text-decoration: none;
      padding: 0.45rem 2.5rem 0.45rem 0.75rem;
      color: var(--c-panel-border);
      transition: none;

      span {
        line-height: 1;

        &:first-child {
          color: var(--c-gold);
          visibility: hidden;
        }
      }
    }

    &.is-active a {
      background: var(--c-gold);
      color: var(--c-ink-900);
      box-shadow:
        inset 2px 2px 0 0 color-mix(in oklab, var(--c-gold) 70%, white),
        inset -2px -2px 0 0 color-mix(in oklab, var(--c-gold) 60%, black);

      .cursor {
        visibility: visible;
        color: var(--c-ink-900);
      }
    }

    a:focus-visible {
      outline: 2px dashed var(--c-gold);
      outline-offset: 2px;
    }
  }
}

@media (prefers-reduced-motion: reduce) {
  nav li.is-active a .cursor {
    animation: none;
  }
}
</style>
