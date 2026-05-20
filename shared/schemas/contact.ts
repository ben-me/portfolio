import * as v from 'valibot'

export const ContactSchema = v.object({
  name: v.pipe(
    v.string(),
    v.nonEmpty('Name is required'),
    v.minLength(2, 'At least 2 characters'),
  ),
  email: v.pipe(
    v.string(),
    v.nonEmpty('Email is required'),
    v.email('Invalid email address'),
  ),
  phone: v.pipe(
    v.string(),
    v.nonEmpty('Phone is required'),
    v.regex(/^\+?[\d\s\-().]{7,}$/, 'Invalid phone number'),
  ),
  subject: v.pipe(
    v.string(),
    v.nonEmpty('Subject is required'),
    v.minLength(3, 'At least 3 characters'),
  ),
  description: v.pipe(
    v.string(),
    v.nonEmpty('Description is required'),
    v.minLength(10, 'At least 10 characters'),
  ),
})

export type ContactForm = v.InferInput<typeof ContactSchema>
