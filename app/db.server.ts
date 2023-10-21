import { and, eq } from 'drizzle-orm'
import { drizzle } from 'drizzle-orm/d1'

import * as schema from './schema'

export const getPosts = async (db_binding: D1Database) => {
  const db = drizzle(db_binding)
  const posts = schema.posts
  const results = await db
    .select({
      id: posts.id,
      title: posts.title,
    })
    .from(posts)
    .where(eq(posts.public, true))

  return results
}

export const getPostData = async (db_binding: D1Database, id: number) => {
  const db = drizzle(db_binding, { schema })
  const results = await db.query.posts.findMany({
    where: and(eq(schema.posts.id, id), eq(schema.posts.public, true)),
    columns: {
      markdown: false,
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

  if (!results[0]) {
    return undefined
  }

  const { postsToTags, ...restResult } = results[0]

  const postData = {
    ...restResult,
    tags: postsToTags.map((e) => e.tagName),
  }

  return postData
}

export const addPost = async (
  db_binding: D1Database,
  postData: schema.InsertPost,
) => {
  const db = drizzle(db_binding)
  const posts = schema.posts
  const results = await db.insert(posts).values(postData)

  return results
}
