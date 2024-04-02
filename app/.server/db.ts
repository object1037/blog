import { and, desc, eq, inArray, notInArray } from 'drizzle-orm'
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

  const updateTagQueries = [
    db.insert(tags).values(tagDatas).onConflictDoNothing(),
    db.insert(postsToTags).values(postTagDatas).onConflictDoNothing(),
    db.delete(postsToTags).where(
      and(
        eq(postsToTags.postId, postData.id),
        notInArray(
          postsToTags.tagName,
          tagDatas.map((e) => e.name),
        ),
      ),
    ),
  ]
  const deletePrivateTagQueries = [
    db.delete(postsToTags).where(eq(postsToTags.postId, postData.id)),
  ]
  const pruneTagsQuery = db
    .delete(tags)
    .where(
      notInArray(
        tags.name,
        db.select({ tag: postsToTags.tagName }).from(postsToTags),
      ),
    )
  const tagQueries = postData.public
    ? updateTagQueries
    : deletePrivateTagQueries

  const results = await db.batch([
    db
      .insert(posts)
      .values(postData)
      .onConflictDoUpdate({ target: posts.id, set: postData }),
    ...tagQueries,
    pruneTagsQuery,
  ])

  return results
}

export const deletePost = async (db_binding: D1Database, id: number) => {
  const db = drizzle(db_binding)
  const posts = schema.posts
  const tags = schema.tags
  const postsToTags = schema.postsToTags

  const results = await db.batch([
    db.delete(posts).where(eq(posts.id, id)),
    db
      .delete(tags)
      .where(
        notInArray(
          tags.name,
          db.select({ tag: postsToTags.tagName }).from(postsToTags),
        ),
      ),
  ])

  return results
}

export const getTags = async (db_binding: D1Database) => {
  const db = drizzle(db_binding)
  const tags = schema.tags

  const results = await db
    .select({ tag: tags.name })
    .from(tags)
    .then((tagData) => tagData.map((e) => e.tag))

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
