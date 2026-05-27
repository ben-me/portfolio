<script setup lang="ts">
const { locale, locales } = useI18n();
const switchLocalePath = useSwitchLocalePath();
</script>

<template>
  <nav :aria-label="$t('lang_switcher_label')">
    <NuxtLink
      v-for="loc in locales"
      :key="loc.code"
      :to="switchLocalePath(loc.code)"
      :lang="loc.code"
      :aria-label="loc.name"
      :aria-current="locale === loc.code ? 'true' : undefined"
    >
      <svg v-if="loc.code === 'en'" viewBox="0 0 30 18" aria-hidden="true">
        <rect width="30" height="18" fill="#1a3a8a" />
        <path d="M0 0L30 18M30 0L0 18" stroke="#fff" stroke-width="4" />
        <path d="M0 0L30 18M30 0L0 18" stroke="#c8102e" stroke-width="1.5" />
        <rect x="12" width="6" height="18" fill="#fff" />
        <rect y="6" width="30" height="6" fill="#fff" />
        <rect x="13.5" width="3" height="18" fill="#c8102e" />
        <rect y="7.5" width="30" height="3" fill="#c8102e" />
      </svg>
      <svg v-else viewBox="0 0 15 9" aria-hidden="true">
        <rect width="15" height="3" fill="#000" />
        <rect y="3" width="15" height="3" fill="#dd0000" />
        <rect y="6" width="15" height="3" fill="#ffce00" />
      </svg>
    </NuxtLink>
  </nav>
</template>

<style scoped>
nav {
  position: fixed;
  bottom: 0.5rem;
  right: 0.5rem;
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  @media (--md) {
    bottom: 0.75rem;
    right: 0.75rem;
  }
}

a {
  display: block;
  padding: 0;
  border: 2px solid transparent;
  cursor: pointer;
  transition: border-color 0.2s;
  filter: saturate(0.45) brightness(0.7);

  &:hover {
    filter: none;
  }

  &:focus-visible {
    outline: 2px dashed var(--c-gold);
    outline-offset: 3px;
  }

  &[aria-current="true"] {
    border-color: var(--c-gold);
    filter: drop-shadow(0 0 3px var(--c-gold));
  }

  svg {
    display: block;
    width: 1.875rem;
    height: auto;

    @media (--md) {
      width: 2.5rem;
    }
  }
}
</style>
