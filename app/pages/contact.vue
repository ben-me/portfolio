<script setup lang="ts">
import emailjs from "@emailjs/browser";
import * as v from "valibot";

import type { ContactForm } from "#shared/schemas/contact";

import { ContactSchema } from "#shared/schemas/contact";
import { useNotificationsStore } from "~/store/notifications";

type FormKey = keyof ContactForm;

const form = ref<ContactForm>({
  name: "",
  email: "",
  phone: "",
  subject: "",
  description: "",
});

const errors = ref<Partial<Record<FormKey, string>>>({});
const formRef = useTemplateRef("formRef");
const config = useRuntimeConfig();

const isSubmitting = ref(false);
const { t } = useI18n();
const notifications = useNotificationsStore();

useSeoMeta({
  title: t("contact_title"),
  description: t("contact_meta_description"),
});

function validateField(field: FormKey) {
  const value = form.value[field];
  if (typeof value === "string" && !value.trim()) {
    delete errors.value[field];
    return;
  }
  const result = v.safeParse(ContactSchema.entries[field], value);
  if (result.success) {
    delete errors.value[field];
  }
  else {
    errors.value[field] = result.issues[0].message;
  }
}

async function handleSubmit() {
  const result = v.safeParse(ContactSchema, form.value);
  if (!result.success) {
    const { nested = {} } = v.flatten<typeof ContactSchema>(result.issues);
    errors.value = {
      name: nested.name?.[0],
      email: nested.email?.[0],
      phone: nested.phone?.[0],
      subject: nested.subject?.[0],
      description: nested.description?.[0],
    };
    return;
  }
  errors.value = {};
  isSubmitting.value = true;
  try {
    await emailjs.sendForm(
      config.public.emailjsServiceId,
      config.public.emailjsContactTemplateId,
      formRef.value as HTMLFormElement,
      { publicKey: config.public.emailjsPublicKey },
    );
    form.value = { name: "", email: "", phone: "", subject: "", description: "" };
    notifications.create({
      status: "success",
      message: t("contact_success_message"),
    });
  }
  catch {
    notifications.create({
      status: "error",
      message: t("contact_error_message"),
    });
  }
  finally {
    isSubmitting.value = false;
  }
}
</script>

<template>
  <section class="wrapper">
    <h1>{{ $t('contact') }}</h1>

    <form ref="formRef" novalidate @submit.prevent="handleSubmit">
      <div>
        <label for="name">
          <span aria-hidden="true">▶</span>
          {{ $t('contact_name') }}
        </label>
        <input
          id="name"
          v-model="form.name"
          autocomplete="name"
          :placeholder="$t('contact_name_placeholder')"
          :aria-invalid="!!errors.name || undefined"
          :aria-describedby="errors.name ? 'name-error' : undefined"
          @input="validateField('name')"
        >
        <span v-if="errors.name" id="name-error" role="alert">{{ errors.name }}</span>
      </div>

      <div>
        <label for="email">
          <span aria-hidden="true">▶</span>
          {{ $t('contact_email') }}
        </label>
        <input
          id="email"
          v-model="form.email"
          type="email"
          autocomplete="email"
          :placeholder="$t('contact_email_placeholder')"
          :aria-invalid="!!errors.email || undefined"
          :aria-describedby="errors.email ? 'email-error' : undefined"
          @input="validateField('email')"
        >
        <span v-if="errors.email" id="email-error" role="alert">{{ errors.email }}</span>
      </div>

      <div>
        <label for="phone">
          <span aria-hidden="true">▶</span>
          {{ $t('contact_phone') }}
        </label>
        <input
          id="phone"
          v-model="form.phone"
          type="tel"
          autocomplete="tel"
          :placeholder="$t('contact_phone_placeholder')"
          :aria-invalid="!!errors.phone || undefined"
          :aria-describedby="errors.phone ? 'phone-error' : undefined"
          @input="validateField('phone')"
        >
        <span v-if="errors.phone" id="phone-error" role="alert">{{ errors.phone }}</span>
      </div>

      <div>
        <label for="subject">
          <span aria-hidden="true">▶</span>
          {{ $t('contact_subject') }}
        </label>
        <input
          id="subject"
          v-model="form.subject"
          :placeholder="$t('contact_subject_placeholder')"
          :aria-invalid="!!errors.subject || undefined"
          :aria-describedby="errors.subject ? 'subject-error' : undefined"
          @input="validateField('subject')"
        >
        <span v-if="errors.subject" id="subject-error" role="alert">{{ errors.subject }}</span>
      </div>

      <div>
        <label for="description">
          <span aria-hidden="true">▶</span>
          {{ $t('contact_message') }}
        </label>
        <textarea
          id="description"
          v-model="form.description"
          rows="5"
          :placeholder="$t('contact_message_placeholder')"
          :aria-invalid="!!errors.description || undefined"
          :aria-describedby="errors.description ? 'description-error' : undefined"
          @input="validateField('description')"
        />
        <span v-if="errors.description" id="description-error" role="alert">{{ errors.description }}</span>
      </div>

      <button :disabled="isSubmitting">
        <svg v-if="isSubmitting" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path fill="currentColor" d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z"><animateTransform attributeName="transform" dur="0.75s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12" />
          </path>
        </svg>
        {{ $t('contact_send') }}
      </button>
    </form>
  </section>
</template>

<style scoped>
section {
  display: flex;
  flex-direction: column;
  align-items: center;
}

form {
  width: 100%;
  max-width: 56.25rem;
  background: var(--c-panel);
  border: 2px solid var(--c-gold);
  box-shadow: var(--panel-shadow);
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  padding: 1.75rem 2rem 2rem;

  label {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    font-family: "Jersey 15";
    font-size: var(--fs-0);
    color: var(--c-sky-200);
    margin-block-end: 0.3rem;
    user-select: none;

    span:first-child {
      color: var(--c-gold);
      display: inline-block;
      width: 0.7em;
      font-size: 0.75em;
      line-height: 1;
    }
  }

  input,
  textarea {
    background: color-mix(in oklab, var(--c-panel) 80%, black);
    color: var(--c-cream-100);
    border: 2px solid var(--c-sky-400);
    padding: 0.45rem 0.75rem;
    outline: none;
    transition: border-color 0.1s;

    &:focus {
      border-color: var(--c-gold);
    }

    &[aria-invalid="true"] {
      border-color: var(--c-rose);
    }
  }

  textarea {
    resize: vertical;
    min-height: 7rem;
  }

  div {
    display: flex;
    flex-direction: column;
  }
}

span[role="alert"] {
  font-family: var(--ff-mono);
  font-size: var(--fs--1);
  color: var(--c-rose);
  margin-block-start: 0.25rem;

  &::before {
    content: "✕ ";
  }
}

button {
  position: relative;
  padding: 0.25rem 1.75rem 0.15rem;
  cursor: pointer;
  align-self: end;
  border: 2px solid var(--btn-border);
  box-shadow: 4px 4px 0 var(--c-border);
  transition: all 0.08s;
  font-family: "Jersey 15";
  font-size: var(--fs-1);
  background: var(--c-gold);
  color: var(--c-ink-900);

  svg {
    position: absolute;
    inset: 0;
    margin: auto;
    width: 1em;
    height: 1em;
    color: var(--c-ink-900);
  }

  &:active {
    transform: translate(var(--offset), var(--offset));
    box-shadow: 0 0 0 var(--btn-color);
  }

  &:focus-visible {
    outline: 2px dashed var(--c-gold);
    outline-offset: 3px;
  }

  &:hover {
    background: color-mix(in oklab, var(--c-gold) 75%, white);
  }

  &:disabled {
    opacity: 0.5;
    color: transparent;
  }
}
</style>
