<script setup lang="ts">
import type { StageProps } from "@/components/stage-card.vue";

const { t, locale } = useI18n();

useSeoMeta({
  title: t("projects_title"),
  description: t("projects_meta_description"),
});

const stages = computed<StageProps[]>(() => [
  {
    stage: "1-5",
    title: t("projects_stage_wip_title"),
    description: t("projects_stage_wip_desc"),
    status: "locked",
    kind: "personal",
    tags: ["Svelte", "TypeScript", "HTML", "CSS", "Vite", "PostgreSQL", "Docker", "Drizzle", "Better Auth"],
  },
  {
    stage: "1-4",
    title: "Simple Scale",
    description: t("projects_stage_simple_scale_desc"),
    status: "cleared",
    kind: "personal",
    tags: ["React Native", "SQLite", "Expo", "Drizzle ORM"],
    src: locale.value === "de" ? "/img/simple-scale-de.webp" : "/img/simple-scale-en.webp",
    url: "https://play.google.com/store/apps/details?id=de.codepilots.simple_scale&pli=1",
    alt: $t("projects_stage_simple_scale_alt"),
  },
  {
    stage: "1-3",
    title: t("projects_stage_vi_title"),
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
    alt: $t("projects_stage_simple_scale_alt"),
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
    alt: $t("projects_stage_codepilots_alt"),
    url: "https://codepilots.de",
  },
]);
</script>

<template>
  <div class="page-wrapper">
    <section class="wrapper">
      <h1>{{ $t('projects') }}</h1>
      <ul>
        <li v-for="stage in stages" :key="stage.stage">
          <StageCard v-bind="stage" />
        </li>
      </ul>
    </section>
  </div>
</template>

<style scoped>
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
