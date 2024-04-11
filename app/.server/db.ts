import { and, count, desc, eq, inArray, notInArray } from 'drizzle-orm'
import { drizzle } from 'drizzle-orm/d1'

import * as schema from './schema'

export const getPosts = async (db_binding: D1Database) => {
  const db = drizzle(db_binding)
  const posts = schema.posts
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

export const getAllPosts = async (db_binding: D1Database) => {
  const db = drizzle(db_binding)
  const posts = schema.posts
  const results = await db
    .select({
      id: posts.id,
      title: posts.title,
      description: posts.description,
      public: posts.public,
    })
    .from(posts)
    .orderBy(desc(posts.id))

  return results
}

export const getPostData = async (db_binding: D1Database, id: number) => {
  const db = drizzle(db_binding, { schema })
  const posts = schema.posts
  const result = await db.query.posts.findFirst({
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

  if (!result) {
    return undefined
  }

  const { postsToTags, ...restResult } = result

  const postData = {
    ...restResult,
    tags: postsToTags.map((e) => e.tagName),
  }

  return postData
}

export const getMarkdown = async (db_binding: D1Database, id: number) => {
  const db = drizzle(db_binding, { schema })
  const posts = schema.posts
  const result = await db.query.posts.findFirst({
    where: and(eq(posts.id, id), eq(posts.public, true)),
    columns: {
      markdown: true,
    },
  })

  if (!result) {
    return undefined
  }

  return result.markdown
}

export const getAllPostData = async (db_binding: D1Database, id: number) => {
  const db = drizzle(db_binding, { schema })
  const posts = schema.posts
  const result = await db.query.posts.findFirst({
    where: eq(posts.id, id),
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

  const { postsToTags, ...restResult } = result

  const postData = {
    ...restResult,
    tags: postsToTags.map((e) => e.tagName),
  }

  return postData
}

export const addPost = async (
  db_binding: D1Database,
  postData: Required<schema.InsertPost>,
  tags: string[],
) => {
  const db = drizzle(db_binding)
  const posts = schema.posts
  const postsToTags = schema.postsToTags

  const postTagDatas: schema.InsertPostsToTags[] = tags.map((tag) => ({
    postId: postData.id,
    tagName: tag,
  }))

  const updateTagQueries = [
    db.insert(postsToTags).values(postTagDatas).onConflictDoNothing(),
    db
      .delete(postsToTags)
      .where(
        and(
          eq(postsToTags.postId, postData.id),
          notInArray(postsToTags.tagName, tags),
        ),
      ),
  ]
  const deletePrivateTagQueries = [
    db.delete(postsToTags).where(eq(postsToTags.postId, postData.id)),
  ]
  const tagQueries = postData.public
    ? updateTagQueries
    : deletePrivateTagQueries

  const results = await db.batch([
    db
      .insert(posts)
      .values(postData)
      .onConflictDoUpdate({ target: posts.id, set: postData }),
    ...tagQueries,
  ])

  return results
}

export const deletePost = async (db_binding: D1Database, id: number) => {
  const db = drizzle(db_binding)
  const posts = schema.posts

  const results = await db.delete(posts).where(eq(posts.id, id))

  return results
}

export const getTags = async (db_binding: D1Database) => {
  const db = drizzle(db_binding)
  const postsToTags = schema.postsToTags

  const results = await db
    .select({
      tagName: postsToTags.tagName,
      count: count(),
    })
    .from(postsToTags)
    .groupBy(postsToTags.tagName)
    .orderBy(desc(count()))

  return results
}

export const getPostsWithTag = async (db_binding: D1Database, tag: string) => {
  const db = drizzle(db_binding)
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
