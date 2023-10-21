import { relations } from 'drizzle-orm';
import { integer, primaryKey, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const posts = sqliteTable('posts', {
  id: integer('id').primaryKey(),
  title: text('title').notNull(),
  public: integer('public', { mode: 'boolean' }),
  markdown: text('markdown').notNull(),
  html: text('html').notNull(),
})

export const postsRelations = relations(posts, ({ many }) => ({
  postsToTags: many(postsToTags),
}))

export type InsertPost = typeof posts.$inferInsert

export const tags = sqliteTable('tags', {
  name: text('name').primaryKey(),
})

export const tagsRelations = relations(tags, ({ many }) => ({
  postsToTags: many(postsToTags),
}))

export const postsToTags = sqliteTable(
  'posts_to_tags',
  {
    postId: integer('post_id')
      .notNull()
      .references(() => posts.id, { onDelete: 'cascade' }),
    tagName: text('tag_name')
      .notNull()
      .references(() => tags.name, { onDelete: 'cascade' }),
  },
  (t) => ({
    pk: primaryKey(t.postId, t.tagName),
  }),
)

export const postsToTagsRelations = relations(postsToTags, ({ one }) => ({
  post: one(posts, {
    fields: [postsToTags.postId],
    references: [posts.id],
  }),
  tag: one(tags, {
    fields: [postsToTags.tagName],
    references: [tags.name],
  }),
}))