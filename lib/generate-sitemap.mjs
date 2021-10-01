import { writeFileSync } from 'fs';
import { globby } from 'globby';
import prettier from 'prettier'

async function generate() {
  const pages = await globby([
    'pages/*.tsx',
    'pages/**/*.{mdx,tsx}',
    '!pages/_*.tsx',
    '!pages/testPost.mdx',
    '!pages/404.tsx',
    '!pages/tags/[tag].tsx'
  ]);

  const images = await globby([
    'public/images/**/*.{jpg,jpeg,png}',
    '!public/images/testPost/*',
    '!public/images/profile.jpg',
  ]);

  const sitemap = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
            xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
        ${pages
          .map((page) => {
            let imagePaths = ''
            const path = page
              .replace('pages', '')
              .replace('.tsx', '')
              .replace('.mdx', '')
              .replace('/index', '');

            if (path.substr(1, 5) === 'posts') {
              const imagesOfThePage = images.filter(imagePath => imagePath.substr(14, 8) === path.substr(7, 8));
              imagePaths = imagesOfThePage.map((imagePath) => {
                const path = imagePath.replace('public', '');
                return `
                  <image:image>
                    <image:loc>${`https://blog.object1037.dev${path}`}</image:loc>
                  </image:image>
                `
              }).join('')
            }

            return `
              <url>
                  <loc>${`https://blog.object1037.dev${path}`}</loc>
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
}

generate();