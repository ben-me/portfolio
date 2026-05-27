import * as v from "valibot";

import { useNuxtApp } from "#app";

const t = (key: string) => (useNuxtApp().$i18n as { t: (key: string) => string }).t(key);

export const ContactSchema = v.object({
  name: v.pipe(
    v.string(),
    v.nonEmpty(() => t("err_name_required")),
    v.minLength(2, () => t("err_name_min")),
  ),
  email: v.pipe(
    v.string(),
    v.nonEmpty(() => t("err_email_required")),
    v.email(() => t("err_email_invalid")),
  ),
  phone: v.pipe(
    v.string(),
    v.nonEmpty(() => t("err_phone_required")),
    v.regex(/^\+?[\d\s\-().]{7,}$/, () => t("err_phone_invalid")),
  ),
  subject: v.pipe(
    v.string(),
    v.nonEmpty(() => t("err_subject_required")),
    v.minLength(3, () => t("err_subject_min")),
  ),
  description: v.pipe(
    v.string(),
    v.nonEmpty(() => t("err_description_required")),
    v.minLength(10, () => t("err_description_min")),
  ),
});

export type ContactForm = v.InferInput<typeof ContactSchema>;
