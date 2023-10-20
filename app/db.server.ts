import { drizzle } from 'drizzle-orm/d1'

import { posts } from './schema'

export const getPosts = async (db_binding: D1Database) => {
  const db = drizzle(db_binding)
  const results = await db.select().from(posts)

  return results
}
