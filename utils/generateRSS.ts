import { writeFileSync } from 'fs'
import RSS from 'rss'
import { zonedTimeToUtc } from 'date-fns-tz'
import { siteTitle, siteUrl } from '../constants/data';

export default function generateRSS(metas: metaData[]) {
  const feed = new RSS({
    title: siteTitle,
    site_url: siteUrl,
    feed_url: `${siteUrl}/feed.xml`
  });

  metas.map((post) => {
    let fileType = 'image/png'
    if (post.ogImgUrl && post.ogImgUrl.substr(post.ogImgUrl.length - 4, 3) != "png") {
      fileType = 'image/jpeg'
    }
    feed.item({
      title: post.title,
      url: `${siteUrl}/posts/${post.date}`,
      date: zonedTimeToUtc(new Date(+post.date.substr(0, 4), +post.date.substr(4, 2) - 1, +post.date.substr(6, 2), 23, 59, 59), "Asia/Tokyo"),
      description: post.description,
      enclosure: {
        'url': post.ogImgUrl ? post.ogImgUrl : encodeURI(`https://og-image.object1037.dev/${post.title}.png?fontSize=64px`),
        'type': fileType
      }
    })
  })

  writeFileSync('./public/feed.xml', feed.xml({ indent: true }));
  console.log("Automatically generated /feed.xml")
}