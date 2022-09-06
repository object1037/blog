import { writeFileSync } from 'fs'
import RSS from 'rss'
import { zonedTimeToUtc } from 'date-fns-tz'
import { siteTitle, siteUrl, getOgImageUrl } from '../constants/data'

export default function generateRSS(posts: postData[]) {
  const feed = new RSS({
    title: siteTitle,
    site_url: siteUrl,
    feed_url: `${siteUrl}/feed.xml`,
  })

  posts.map((post) => {
    let fileType = 'image/png'
    if (
      post.ogImgUrl &&
      post.ogImgUrl.substring(post.ogImgUrl.length - 3) != 'png'
    ) {
      fileType = 'image/jpeg'
    }
    feed.item({
      title: post.title,
      url: `${siteUrl}/posts/${post.date}`,
      date: zonedTimeToUtc(
        new Date(
          +post.date.substring(0, 4),
          +post.date.substring(4, 6) - 1,
          +post.date.substring(6, 8),
          23,
          59,
          59
        ),
        'Asia/Tokyo'
      ),
      description: post.description,
      enclosure: {
        url: post.ogImgUrl ? post.ogImgUrl : getOgImageUrl(post.title),
        type: fileType,
      },
    })
  })

  writeFileSync('./public/feed.xml', feed.xml({ indent: true }))
  console.log('Automatically generated /feed.xml')
}
