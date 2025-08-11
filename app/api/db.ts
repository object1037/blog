import { and, count, desc, eq, inArray } from 'drizzle-orm'
import { drizzle } from 'drizzle-orm/d1'
import * as schema from '../schema'

const { posts, postsToTags } = schema

export const getPostByID = async (db_binding: D1Database, id: number) => {
  const db = drizzle(db_binding, { schema })
  const result = await db.query.posts.findFirst({
    where: and(eq(posts.id, id), eq(posts.public, true)),
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

export const getPublicPosts = async (db_binding: D1Database) => {
  const db = drizzle(db_binding, { schema })
  const results = await db
    .select({
      id: posts.id,
      title: posts.title,
      description: posts.description,
    })
    .from(posts)
    .where(eq(posts.public, true))
    .orderBy(desc(posts.id))

  return results
}

export const getTags = async (db_binding: D1Database) => {
  const db = drizzle(db_binding, { schema })
  const results = await db
    .select({
      name: postsToTags.tagName,
      count: count(),
    })
    .from(postsToTags)
    .groupBy(postsToTags.tagName)
    .orderBy(desc(count()))

  return results
}

export const getPostsWithTag = async (db_binding: D1Database, tag: string) => {
  const db = drizzle(db_binding, { schema })
  const posts = schema.posts
  const postsToTags = schema.postsToTags

  const postIdQuery = db
    .select({ postId: postsToTags.postId })
    .from(postsToTags)
    .where(eq(postsToTags.tagName, tag))

  const results = await db
    .select({
      id: posts.id,
      title: posts.title,
      description: posts.description,
    })
    .from(posts)
    .where(inArray(posts.id, postIdQuery))
    .orderBy(desc(posts.id))

  return results
}
