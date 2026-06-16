<script setup lang="ts">
const { t } = useI18n();

const skills = computed(() => [
  { label: "Svelte", value: 90 },
  { label: "Vue", value: 70 },
  { label: "React", value: 80 },
  { label: "HTML", value: 95 },
  { label: "CSS", value: 90 },
  { label: "TypeScript", value: 75 },
  { label: t("about_skill_accessibility"), value: 80, dataKey: "accessibility" },
]);

const experiences = computed(() => [
  t("about_exp_rest"),
  t("about_exp_storyblok"),
  t("about_exp_accessible_interfaces"),
  t("about_exp_docker"),
  t("about_exp_self_hosting"),
  t("about_exp_seo"),
  t("about_exp_postgresql"),
]);
</script>

<template>
  <section class="wrapper">
    <h1>{{ $t('about') }}</h1>

    <div class="arena">
      <div class="portrait">
        <div class="frame">
          <NuxtImg src="/img/ben.webp" :alt="$t('about_portrait_alt')" />
        </div>
        <span class="tag" aria-hidden="true">{{ $t('about_player_one') }}</span>
      </div>

      <div class="stats">
        <div>
          <p class="name">
            Benedikt Mehler
          </p>
          <p class="job-title">
            {{ $t('about_job_title') }}
          </p>
        </div>
        <section>
          <h2>{{ $t('about_skills') }}</h2>
          <dl class="bars">
            <div
              v-for="(skill) in skills"
              :key="skill.label"
              :data-skill="('dataKey' in skill ? skill.dataKey : skill.label.toLowerCase())"
              :style="{ '--pct': skill.value }"
            >
              <dt>
                <span class="label">{{ skill.label }}</span>
                <span class="value" aria-hidden="true">{{ skill.value / 10 }}<small>/10</small></span>
              </dt>
              <dd>
                <meter :value="skill.value" min="0" max="100" class="sr-only">
                  {{ skill.value }}/100
                </meter>
              </dd>
            </div>
          </dl>
        </section>
        <section class="inventory">
          <h2>{{ $t('about_experience_with') }}</h2>
          <ul>
            <li v-for="(experience, i) in experiences" :key="experience" :style="{ '--i': i }">
              <span class="icon" aria-hidden="true">◆</span>
              <span class="label">{{ experience }}</span>
            </li>
          </ul>
        </section>
      </div>
    </div>
  </section>
</template>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
}

.arena {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;

  @media (--md) {
    flex-direction: row;
  }
}

.portrait {
  display: flex;
  flex-direction: column;
  align-self: center;
  align-items: center;
  max-width: 20rem;

  @media (--md) {
    align-self: flex-start;
  }

  .frame {
    position: relative;
    background: var(--c-panel);
    border: 2px solid var(--c-gold);
    box-shadow: var(--panel-shadow);

    img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .tag {
    font-family: "Jersey 15";
    color: var(--c-black);
  }
}

.stats {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.5rem;
  background: var(--c-panel);
  border: 2px solid var(--c-gold);
  box-shadow: var(--panel-shadow);

  .name {
    font-family: "Jersey 15";
    font-size: var(--fs-3);
    color: var(--c-gold);
    line-height: 1;
  }

  .job-title {
    font-size: var(--fs-1);
    font-family: "Jersey 15";
    color: var(--c-sky-400);
  }

  h2 {
    font-family: "Jersey 15";
    font-size: var(--fs-1);
    line-height: 1;
    color: var(--c-sky-400);
    margin-block-end: 0.5rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;

    &::before {
      content: "▼";
      font-size: var(--fs--1);
      color: var(--c-coral);
    }

    &::after {
      content: "";
      flex: 1;
      height: 2px;
      background: var(--c-panel-border);
      opacity: 0.3;
    }
  }
}

.inventory {
  ul {
    padding: 0;
    margin: 0;
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  li {
    list-style: none;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.25rem 0.65rem;
    font-family: "Jersey 15";
    letter-spacing: 0.05em;
    color: var(--c-white);
    background: var(--c-panel-shade);
    border: 2px solid var(--c-chip, var(--c-gold));
    box-shadow:
      inset 1px 1px 0 var(--c-panel-shine),
      inset -1px -1px 0 var(--c-black),
      3px 3px 0 var(--c-black);
    transition:
      transform 0.15s steps(2),
      box-shadow 0.15s steps(2);

    &:nth-child(7n + 1) {
      --c-chip: var(--c-gold);
    }
    &:nth-child(7n + 2) {
      --c-chip: var(--c-coral);
    }
    &:nth-child(7n + 3) {
      --c-chip: var(--c-mint);
    }
    &:nth-child(7n + 4) {
      --c-chip: var(--c-sky-300);
    }
    &:nth-child(7n + 5) {
      --c-chip: var(--c-peach);
    }
    &:nth-child(7n + 6) {
      --c-chip: var(--c-green-300);
    }
    &:nth-child(7n + 7) {
      --c-chip: var(--c-rose);
    }
  }

  .icon {
    font-size: var(--fs--1);
    color: var(--c-chip);
    text-shadow: 0 0 6px currentColor;
  }
}

.bars {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  margin: 0;

  div {
    color: var(--c-white);

    &[data-skill="svelte"] {
      --c-chip: var(--c-svelte);
    }
    &[data-skill="vue"] {
      --c-chip: var(--c-vue);
    }
    &[data-skill="react"] {
      --c-chip: var(--c-react);
    }
    &[data-skill="html"] {
      --c-chip: var(--c-html);
    }
    &[data-skill="css"] {
      --c-chip: var(--c-css);
    }
    &[data-skill="typescript"] {
      --c-chip: var(--c-typescript);
    }
    &[data-skill="accessibility"] {
      --c-chip: var(--c-accessibility);
    }
  }

  dt {
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: center;
    gap: 0.5rem;
    font-family: "Jersey 15";
    font-size: var(--fs-0);
    letter-spacing: 0.05em;
    line-height: 1;
    margin-block-end: 0.25rem;
  }

  .value {
    color: var(--c-chip);
    font-family: "Jersey 10";
    font-size: var(--fs-1);
    line-height: 0.6;

    small {
      color: var(--c-sky-300);
      font-size: var(--fs--1);
      opacity: 0.7;
    }
  }

  dd {
    --segments: 10;
    height: 0.9rem;
    margin: 0;
    background: color-mix(var(--c-chip), black 65%);
    border: 2px solid var(--c-chip);
    box-shadow:
      inset 1px 1px 0 var(--c-panel-shine),
      inset -1px -1px 0 var(--c-black),
      3px 3px 0 var(--c-black);
    position: relative;

    &::before {
      content: "";
      position: absolute;
      inset-block: 0;
      inset-inline-start: 0;
      width: calc(var(--pct) * 1%);
      background: linear-gradient(
        to bottom,
        color-mix(in oklab, var(--c-chip), white 30%) 0 35%,
        var(--c-chip) 35% 65%,
        color-mix(in oklab, var(--c-chip), black 25%) 65% 100%
      );
    }

    &::after {
      content: "";
      position: absolute;
      inset: 0;
      pointer-events: none;
      background-image: repeating-linear-gradient(
        to right,
        transparent 0 calc(100% / var(--segments) - 2px),
        var(--c-black) calc(100% / var(--segments) - 2px) calc(100% / var(--segments))
      );
    }
  }
}

@media (prefers-reduced-motion: no-preference) {
  .inventory li {
    animation: chip-pop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 0.3s both;
    animation-delay: calc(var(--i) * 80ms + 0.4s);
  }

  .inventory .icon {
    animation: chip-blink 2.4s steps(2) infinite;
    animation-delay: calc(var(--i) * 200ms);
  }

  .bars dd::before {
    animation: fill-bar 1.4s cubic-bezier(0.22, 1, 0.36, 1) 0.5s both;
  }
}

@keyframes chip-pop {
  0% {
    opacity: 0;
    transform: translateY(8px) scale(0.8);
  }
  60% {
    opacity: 1;
    transform: translateY(-2px) scale(1.02);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes chip-blink {
  0%,
  70%,
  100% {
    opacity: 1;
  }
  80% {
    opacity: 0.35;
  }
}

@keyframes fill-bar {
  from {
    width: 0;
  }
  to {
    width: calc(var(--pct) * 1%);
  }
}
</style>
