import { writeFileSync } from 'fs'
import prettier from 'prettier'
import { globby } from 'globby'
import { siteUrl } from '../constants/data'

const robots = `
User-agent: *
Disallow: /posts/testPost
Sitemap: ${siteUrl}/sitemap.xml
`.trim()

export default async function generateSitemap(tags: string[]) {
  const tagPages = tags.map((tag) => {
    return encodeURI(`pages/tags/${tag}.tsx`)
  })

  const pages = await globby([
    'pages/*.tsx',
    'pages/**/*.{mdx,tsx}',
    'posts/*.mdx',
    '!pages/_*.tsx',
    '!posts/testPost.mdx',
    '!pages/404.tsx',
    '!pages/posts/[date].tsx',
    '!pages/tags/[tag].tsx'
  ]);

  const images = await globby([
    'public/images/**/*.{jpg,jpeg,png}',
    '!public/images/testPost/*',
    '!public/images/profile.jpg',
  ])

  const allPages = pages.concat(tagPages)

  const sitemap = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
            xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
        ${allPages
          .map((page) => {
            let imagePaths = ''
            let path = page
              .replace('pages/', '')
              .replace('.tsx', '')
              .replace('.mdx', '')
              .replace('index', '');

            if (path.charAt(path.length - 1) === '/') {
              path = path.slice(0, -1)
            }

            if (path.substr(0, 5) === 'posts') {
              const imagesOfThePage = images.filter(imagePath => imagePath.substr(14, 8) === path.substr(6, 8));
              imagePaths = imagesOfThePage.map((imagePath) => {
                const path = imagePath.replace('public', '');
                return `
                  <image:image>
                    <image:loc>${`${siteUrl}${path}`}</image:loc>
                  </image:image>
                `
              }).join('')
            }

            return `
              <url>
                  <loc>${`${siteUrl}${path ? `/${path}` : ''}`}</loc>
                  ${imagePaths}
              </url>
            `;
          })
          .join('')}
    </urlset>
    `;
  
  const formatted = prettier.format(sitemap, {
    parser: 'html'
  });

  writeFileSync('public/sitemap.xml', formatted);
  writeFileSync('public/robots.txt', robots);
  console.log("Automatically generated /sitemap.xml and /robots.txt")
}