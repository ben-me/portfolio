import * as v from "valibot";

import { m } from "../../app/paraglide/messages.js";

export const ContactSchema = v.object({
  name: v.pipe(
    v.string(),
    v.nonEmpty(() => m.err_name_required()),
    v.minLength(2, () => m.err_name_min()),
  ),
  email: v.pipe(
    v.string(),
    v.nonEmpty(() => m.err_email_required()),
    v.email(() => m.err_email_invalid()),
  ),
  phone: v.pipe(
    v.string(),
    v.nonEmpty(() => m.err_phone_required()),
    v.regex(/^\+?[\d\s\-().]{7,}$/, () => m.err_phone_invalid()),
  ),
  subject: v.pipe(
    v.string(),
    v.nonEmpty(() => m.err_subject_required()),
    v.minLength(3, () => m.err_subject_min()),
  ),
  description: v.pipe(
    v.string(),
    v.nonEmpty(() => m.err_description_required()),
    v.minLength(10, () => m.err_description_min()),
  ),
});

export type ContactForm = v.InferInput<typeof ContactSchema>;
