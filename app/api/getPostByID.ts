import { and, eq } from 'drizzle-orm'
import { drizzle } from 'drizzle-orm/d1'
import * as schema from '../db/schema'

export const getPostByID = async (db_binding: D1Database, id: number) => {
  const db = drizzle(db_binding, { schema })
  const result = await db.query.posts.findFirst({
    where: and(eq(schema.posts.id, id), eq(schema.posts.public, true)),
    columns: {
      public: false,
    },
    with: {
      postsToTags: {
        columns: {
          tagName: true,
        },
      },
    },
  })

  if (!result) {
    return undefined
  }

  const { postsToTags, ...rest } = result
  return {
    ...rest,
    tags: postsToTags.map((pt) => pt.tagName),
  }
}
