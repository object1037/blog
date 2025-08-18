import { and, count, desc, eq, inArray, notInArray } from 'drizzle-orm'
import { drizzle } from 'drizzle-orm/d1'
import * as v from 'valibot'
import { parseYaml } from '../lib/frontmatter'
import * as schema from '../lib/schema'

const { posts, postsToTags } = schema

export type Post = NonNullable<Awaited<ReturnType<typeof getPostByID>>>
export type Posts = Awaited<ReturnType<typeof getPublicPosts>>
export type Tags = NonNullable<Awaited<ReturnType<typeof getTags>>>
export type InsertPost = typeof posts.$inferInsert
export type InsertPostsToTags = typeof postsToTags.$inferInsert
export type FrontMatter = Omit<Post, 'content'> & { public: boolean }

const frontmatterSchema = v.object({
  id: v.number(),
  title: v.string(),
  description: v.string(),
  public: v.boolean(),
  tags: v.array(v.string()),
})

export const parseFrontmatter = v.pipe(
  v.string(),
  v.transform((input) => parseYaml(input)),
  v.transform(({ id, public: isPublic, ...rest }) => {
    return {
      ...rest,
      id: Number(id),
      public: isPublic ?? false,
    }
  }),
  frontmatterSchema,
) satisfies v.GenericSchema<string, FrontMatter>

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

export const addPost = async (
  db_binding: D1Database,
  post: InsertPost,
  tags: string[],
) => {
  const db = drizzle(db_binding, { schema })

  const postTagDatas: InsertPostsToTags[] = tags.map((tag) => ({
    postId: post.id,
    tagName: tag,
  }))

  const updateTagQueries = [
    db.insert(postsToTags).values(postTagDatas).onConflictDoNothing(),
    db
      .delete(postsToTags)
      .where(
        and(
          eq(postsToTags.postId, post.id),
          notInArray(postsToTags.tagName, tags),
        ),
      ),
  ]
  const deletePrivateTagQueries = [
    db.delete(postsToTags).where(eq(postsToTags.postId, post.id)),
  ]
  const tagQueries = post.public ? updateTagQueries : deletePrivateTagQueries

  const results = await db.batch([
    db
      .insert(posts)
      .values(post)
      .onConflictDoUpdate({ target: posts.id, set: post }),
    ...tagQueries,
  ])

  return results
}

export const deletePost = async (db_binding: D1Database, id: number) => {
  const db = drizzle(db_binding)

  const results = await db.delete(posts).where(eq(posts.id, id))

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

export const getPostsWithTag = async (
  db_binding: D1Database,
  tag: string,
): Promise<Posts> => {
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
