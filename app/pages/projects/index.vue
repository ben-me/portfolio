<script setup lang="ts">
import type { StageProps } from "~/components/stage-card.vue";

const { t, locale } = useI18n();

const stages = computed<StageProps[]>(() => [

  {
    stage: "1-4",
    title: "Simple Scale",
    description: t("projects_stage_simple_scale_desc"),
    status: "cleared",
    kind: "personal",
    tags: ["React Native", "SQLite", "Expo", "Drizzle ORM"],
    src: locale.value === "de" ? "/img/simple-scale-de.webp" : "/img/simple-scale-en.webp",
    alt: "A headline and text on the left and screenshot of the simple scale app on the right.",
  },
  {
    stage: "1-3",
    title: "Storyblok Projekt",
    description: t("projects_stage_vi_desc"),
    status: "cleared",
    kind: "freelance",
    tags: ["Svelte", "Storyblok", "TypeScript", "REST", "Figma", "CI / CD"],
  },

  {
    stage: "1-2",
    title: "Demo Hair",
    description: t("projects_stage_demo_hair_desc"),
    status: "cleared",
    kind: "personal",
    tags: ["Vue", "Nuxt", "MapLibre", "TailwindCSS", "HTML"],
    src: "/img/demo-hair.webp",
    alt: "Screenshot of the demo hair website homepage",
    url: "https://demo-hair.codepilots.de/",
  },
  {
    stage: "1-1",
    title: "CodePilots",
    description: t("projects_stage_codepilots_desc"),
    status: "cleared",
    kind: "personal",
    tags: ["React", "TypeScript", "HTML", "CSS", "Vite", "Figma", "Docker"],
    src: "/img/codepilots.webp",
    alt: "Screenshot of the codepilots homepage",
    url: "https://codepilots.de",
  },

]);
</script>

<template>
  <section class="wrapper">
    <h1>{{ $t('projects') }}</h1>

    <ul>
      <li v-for="stage in stages" :key="stage.stage">
        <StageCard v-bind="stage" />
      </li>
    </ul>
  </section>
</template>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
  display: grid;
  gap: 1.5rem;
  grid-template-columns: 1fr;

  @media (--md) {
    gap: 2rem;
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
