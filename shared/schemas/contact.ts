import * as v from "valibot";

export const ContactSchema = v.object({
  name: v.pipe(
    v.string(),
    v.nonEmpty(() => "err_name_required"),
    v.minLength(2, () => "err_name_min"),
  ),
  email: v.pipe(
    v.string(),
    v.nonEmpty(() => "err_email_required"),
    v.email(() => "err_email_invalid"),
  ),
  phone: v.pipe(
    v.string(),
    v.nonEmpty(() => "err_phone_required"),
    v.regex(/^\+?[\d\s\-().]{7,}$/, () => "err_phone_invalid"),
  ),
  subject: v.pipe(
    v.string(),
    v.nonEmpty(() => "err_subject_required"),
    v.minLength(3, () => "err_subject_min"),
  ),
  description: v.pipe(
    v.string(),
    v.nonEmpty(() => "err_description_required"),
    v.minLength(10, () => "err_description_min"),
  ),
});

export type ContactForm = v.InferInput<typeof ContactSchema>;
