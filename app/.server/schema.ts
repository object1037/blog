import { relations } from 'drizzle-orm'
import { integer, primaryKey, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export type InsertPost = typeof posts.$inferInsert
export type InsertPostsToTags = typeof postsToTags.$inferInsert

export const posts = sqliteTable('posts', {
  id: integer('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  public: integer('public', { mode: 'boolean' }).notNull(),
  markdown: text('markdown').notNull(),
  html: text('html').notNull(),
})

export const postsRelations = relations(posts, ({ many }) => ({
  postsToTags: many(postsToTags),
}))

export const postsToTags = sqliteTable(
  'posts_to_tags',
  {
    postId: integer('post_id')
      .notNull()
      .references(() => posts.id, { onDelete: 'cascade' }),
    tagName: text('tag_name').notNull(),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.postId, t.tagName] }),
  }),
)

export const postsToTagsRelations = relations(postsToTags, ({ one }) => ({
  post: one(posts, {
    fields: [postsToTags.postId],
    references: [posts.id],
  }),
}))
