import { and, eq, notInArray } from 'drizzle-orm'
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

export const getAllPosts = async (db_binding: D1Database) => {
  const db = drizzle(db_binding)
  const posts = schema.posts
  const results = await db
    .select({
      id: posts.id,
      title: posts.title,
      public: posts.public,
    })
    .from(posts)

  return results
}

export const getPostData = async (db_binding: D1Database, id: number) => {
  const db = drizzle(db_binding, { schema })
  const posts = schema.posts
  const results = await db.query.posts.findMany({
    where: and(eq(posts.id, id), eq(posts.public, true)),
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

export const getAllPostData = async (db_binding: D1Database, id: number) => {
  const db = drizzle(db_binding, { schema })
  const posts = schema.posts
  const results = await db.query.posts.findMany({
    where: eq(posts.id, id),
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
  postData: Required<schema.InsertPost>,
  tagDatas: schema.InsertTag[],
) => {
  const db = drizzle(db_binding)
  const posts = schema.posts
  const tags = schema.tags
  const postsToTags = schema.postsToTags

  const postTagDatas: schema.InsertPostsToTags[] = tagDatas.map((tagData) => ({
    postId: postData.id,
    tagName: tagData.name,
  }))

  await db
    .insert(posts)
    .values(postData)
    .onConflictDoUpdate({ target: posts.id, set: postData })
  await db.insert(tags).values(tagDatas).onConflictDoNothing()
  await db.delete(postsToTags).where(eq(postsToTags.postId, postData.id))
  await db.insert(postsToTags).values(postTagDatas)

  return
}

export const pruneTags = async (db_binding: D1Database) => {
  const db = drizzle(db_binding)
  const tags = schema.tags
  const postsToTags = schema.postsToTags

  const query = db.select({ data: postsToTags.tagName }).from(postsToTags)
  const results = await db.delete(tags).where(notInArray(tags.name, query))

  return results
}

export const deletePost = async (db_binding: D1Database, id: number) => {
  const db = drizzle(db_binding)
  const posts = schema.posts
  const results = await db.delete(posts).where(eq(posts.id, id))

  return results
}
