import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const posts = sqliteTable('posts', {
  id: integer('id').primaryKey(),
  title: text('title').notNull(),
  markdown: text('markdown').notNull(),
  html: text('html').notNull(),
  public: integer('public', { mode: 'boolean' }),
})
