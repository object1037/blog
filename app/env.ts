import { z } from 'zod'

const schemaForType =
  <T>() =>
  // biome-ignore lint/suspicious/noExplicitAny: the type is correct.
  <S extends z.ZodType<T, any, any>>(arg: S) => {
    return arg
  }

export const envSchema = schemaForType<Env>()(
  z.object({
    GITHUB_CLIENT_ID: z.string().min(1),
    GITHUB_CLIENT_SECRET: z.string().min(1),
    CALLBACK_URL: z.string().url(),
    SESSION_SECRET: z.string().min(1),
    DB: z.custom<D1Database>(),
    SESSION_KV: z.custom<KVNamespace>(),
    BUCKET: z.custom<R2Bucket>(),
  }),
)
