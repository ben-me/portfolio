<script setup lang="ts">
type Status = "cleared" | "current" | "locked";
type Kind = "personal" | "freelance";

export type StageProps = {
  stage: string;
  title: string;
  description: string;
  status: Status;
  tags?: string[];
  url?: string;
  src?: string;
  alt?: string;
  kind?: Kind;
};

defineProps<StageProps>();
</script>

<template>
  <article :class="[status]" :aria-disabled="status === 'locked' || undefined">
    <div class="banner">
      <span class="stage" aria-hidden="true">★ STAGE {{ stage }}</span>
      <div class="badges">
        <span v-if="kind" class="kind" :data-kind="kind">{{ $t(`projects_kind_${kind}`) }}</span>
        <span class="status" :data-status="status">
          <template v-if="status === 'cleared'">CLEAR!</template>
          <template v-else-if="status === 'current'">NEW!</template>
          <template v-else>LOCKED</template>
        </span>
      </div>
    </div>

    <div class="screen" :class="{ empty: !src }">
      <NuxtImg v-if="src" :src="src" :alt="alt ?? ''" />
      <template v-else>
        <span class="placeholder" aria-hidden="true">?</span>
        <span class="scanlines" aria-hidden="true" />
      </template>
    </div>

    <div class="meta">
      <h2>
        <component :is="url && status !== 'locked' ? 'a' : 'span'" :href="url" target="_blank">
          {{ title }}
        </component>
      </h2>
      <p class="description">
        {{ description }}
      </p>
      <ul v-if="tags">
        <li v-for="t in tags" :key="t" :data-tech="t.toLowerCase()">
          {{ t }}
        </li>
      </ul>
    </div>
  </article>
</template>

<style scoped>
article {
  display: flex;
  flex-direction: column;
  background: var(--c-panel);
  border: 2px solid var(--c-gold);
  box-shadow: var(--panel-shadow);
  color: var(--c-white);
  padding: 1.5rem 1.75rem 1.75rem;
  gap: 1.5rem;
  height: 100%;
}

article.locked {
  opacity: 0.7;
}

.banner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: "Jersey 15";
  line-height: 1;

  .stage {
    font-size: var(--fs-1);
    color: var(--c-gold);
  }

  .badges {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .kind,
  .status {
    padding: 0.3rem 0.7rem;
    font-family: "Jersey 10";
    font-size: var(--fs-0);
    color: var(--c-ink-900);
  }

  .kind[data-kind="personal"] {
    background: var(--c-sky-300);
  }

  .kind[data-kind="freelance"] {
    background: var(--c-peach);
  }

  .status[data-status="cleared"] {
    background: var(--c-green-300);
  }

  .status[data-status="current"] {
    background: var(--c-coral);
    color: var(--c-cream-100);
  }

  .status[data-status="locked"] {
    background: transparent;
    color: var(--c-cream-200);
    border: 2px solid var(--c-ink-500);
  }
}

.screen {
  position: relative;
  aspect-ratio: 3 / 2;
  background: radial-gradient(
    ellipse at center,
    color-mix(in oklab, var(--c-accent) 30%, var(--c-panel-shade)) 0%,
    var(--c-panel-shade) 70%
  );
  border: 2px solid var(--c-black);
  overflow: hidden;

  img {
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .placeholder {
    position: absolute;
    inset: 0;
    display: grid;
    place-items: center;
    font-family: "Jersey 10";
    font-size: var(--fs-5);
    color: var(--c-gold);
    filter: var(--outline);
  }
}

.meta {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  align-items: center;
  text-align: center;
  gap: 2rem;

  h2 {
    font-family: "Jersey 15";
    font-size: var(--fs-3);
    color: var(--c-white);
    line-height: 0.8;
    margin-block-end: -0.5rem;

    a {
      display: flex;
      align-items: flex-end;
      gap: 0.5rem;
      color: var(--c-sky-400);
      text-decoration: underline;
      outline-offset: 3px;

      &:focus-visible {
        outline: 2px dashed var(--c-sky-400);
      }
    }
  }

  .description {
    white-space: pre-line;
    line-height: 1.55;
  }

  ul {
    margin-block-start: auto;
    list-style: none;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
    justify-content: center;
  }

  li {
    --c-chip: var(--c-gold);
    font-family: "Jersey 15";
    line-height: 1;
    padding: 0.2rem 0.55rem;
    background: var(--c-panel-shade);
    border: 2px solid var(--c-chip);
    box-shadow:
      inset 1px 1px 0 var(--c-panel-shine),
      inset -1px -1px 0 var(--c-black);

    &[data-tech="maplibre"] {
      --c-chip: var(--c-maplibre);
    }
    &[data-tech="react native"],
    &[data-tech="react-native"] {
      --c-chip: var(--c-react-native);
    }
    &[data-tech="html"] {
      --c-chip: var(--c-html);
    }
    &[data-tech="css"] {
      --c-chip: var(--c-css);
    }
    &[data-tech="tailwindcss"],
    &[data-tech="tailwind"] {
      --c-chip: var(--c-tailwind);
    }
    &[data-tech="sqlite"] {
      --c-chip: var(--c-sqlite);
    }
    &[data-tech="drizzle orm"],
    &[data-tech="drizzle"] {
      --c-chip: var(--c-drizzle);
    }
    &[data-tech="vue"] {
      --c-chip: var(--c-vue);
    }
    &[data-tech="nuxt"] {
      --c-chip: var(--c-nuxt);
    }
    &[data-tech="react"] {
      --c-chip: var(--c-react);
    }
    &[data-tech="svelte"] {
      --c-chip: var(--c-svelte);
    }
    &[data-tech="storybook"] {
      --c-chip: var(--c-storybook);
    }
    &[data-tech="rest"] {
      --c-chip: var(--c-rest);
    }
    &[data-tech="postgresql"],
    &[data-tech="postgres"] {
      --c-chip: var(--c-postgres);
    }
    &[data-tech="typescript"] {
      --c-chip: var(--c-typescript);
    }
    &[data-tech="javascript"] {
      --c-chip: var(--c-javascript);
    }
    &[data-tech="figma"] {
      --c-chip: var(--c-figma);
    }
    &[data-tech="a11y"],
    &[data-tech="accessibility"] {
      --c-chip: var(--c-accessibility);
    }
  }
}
</style>
