<script setup lang="ts">
import { useNotificationsStore } from "~/store/notifications";

const notifications = useNotificationsStore();
</script>

<template>
  <Teleport to="#teleports">
    <TransitionGroup tag="ul" name="list" appear>
      <li
        v-for="entry in notifications.active" :key="entry.id" class="notification"
        :data-variant="entry.status ?? 'success'"
        role="alert"
        aria-live="polite"
      >
        <div class="banner">
          <span class="icon" aria-hidden="true">
            <template v-if="entry.message === 'success'">★</template>
            <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32" d="M448 225.64v99a64 64 0 0 1-40.23 59.42l-23.68 9.47A32 32 0 0 0 364.6 417l-10 50.14A16 16 0 0 1 338.88 480H173.12a16 16 0 0 1-15.69-12.86L147.4 417a32 32 0 0 0-19.49-23.44l-23.68-9.47A64 64 0 0 1 64 324.67V224c0-105.92 85.77-191.81 191.65-192S448 119.85 448 225.64Z" /><circle cx="168" cy="280" r="40" fill="none" stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32" /><circle cx="344" cy="280" r="40" fill="none" stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32" /><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="m256 336l-16 48h32zm0 112v32m-48-32v32m96-32v32" /></svg>
          </span>
          <span class="title">Hallo welt</span>
          <button type="button" class="close" aria-label="Close" @click="notifications.dismiss(entry)">
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <p>
          {{ entry.message }}
        </p>
      </li>
    </TransitionGroup>
  </Teleport>
</template>

<style scoped>
ul {
  position: absolute;
  inset: auto 0 1.5rem 0;
  width: 28rem;
  margin-inline: auto;
  padding: 0;
  list-style: none;
  z-index: 1;

  &:empty {
    display: none;
  }

  li {
    width: 100%;
    margin-block-start: 1rem;
  }
}

.notification {
  background: var(--c-panel);
  border: 2px solid var(--c-chip);
  box-shadow:
    inset -1px -1px 0 var(--c-black),
    4px 2px 0 var(--c-black);
  font-family: "Jersey 15";

  &[data-variant="success"] {
    --c-chip: var(--c-green-300);
  }

  &[data-variant="error"] {
    --c-chip: var(--c-rose);
  }
}

.banner {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.4rem 0.75rem;
  background: color-mix(in oklab, var(--c-chip) 30%, var(--c-panel));
  border-block-end: 2px solid var(--c-chip);

  .icon {
    color: var(--c-chip);
    font-size: var(--fs-0);
  }

  .title {
    flex: 1;
    font-size: var(--fs-1);
    line-height: 1;
    color: var(--c-chip);
  }
}

button.close {
  background: none;
  border: none;
  color: var(--c-white);
  font-size: var(--fs-1);
  line-height: 0.7;
  padding: 0.1rem 0.5rem;
  cursor: pointer;

  &:focus-visible {
    outline: 2px dashed var(--c-chip);
    outline-offset: 2px;
  }

  @media (--lg) {
    &:hover {
      color: var(--c-chip);
    }
  }
}

p {
  margin: 0;
  padding: 0.75rem 1rem 0.9rem;
  font-size: var(--fs-0);
  line-height: 1.2;
  color: var(--c-cream-100);
}

svg {
  width: 24px;
}

.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}

.list-leave-active {
  position: absolute;
  margin: 0;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translate(0, 30px);
}
</style>
