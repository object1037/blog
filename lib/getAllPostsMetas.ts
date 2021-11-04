import { writeFileSync } from 'fs'
import RSS from 'rss'
import { zonedTimeToUtc } from 'date-fns-tz'

const siteUrl = "https://blog.object1037.dev"
const siteTitle = "ゆるふわインターネット"

export function getAllPostsData() {
  let metas: metaData[] = new Array()

  const contexts = require.context('../pages/posts/', false, /\.mdx$/)
  contexts.keys().map((path: string) => {
    metas.push(contexts(path).meta)
  })

  metas = metas.reverse()

  // ついでにRSS生成
  const feed = new RSS({
    title: siteTitle,
    site_url: siteUrl,
    feed_url: `${siteUrl}/feed.xml`
  });

  metas.map((post) => {
    feed.item({
      title: post.title,
      url: `${siteUrl}/posts/${post.date}`,
      date: zonedTimeToUtc(new Date(+post.date.substr(0, 4), +post.date.substr(4, 2) - 1, +post.date.substr(6, 2)), "Asia/Tokyo"),
      description: post.description
    })
  })

  writeFileSync('./public/feed.xml', feed.xml({ indent: true }));

  return metas
}