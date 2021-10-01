import { writeFileSync } from 'fs';
import { globby } from 'globby';
import prettier from 'prettier'

async function generate() {
  const pages = await globby([
    'pages/*.tsx',
    'pages/**/*.mdx',
    'pages/**/*.tsx',
    '!pages/_*.tsx',
    '!pages/testPost.mdx',
    '!pages/404.tsx',
    '!pages/tags/[tag].tsx'
  ]);

  const sitemap = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${pages
          .map((page) => {
            const path = page
              .replace('pages', '')
              .replace('.tsx', '')
              .replace('.mdx', '')
              .replace('/index', '');

            return `
              <url>
                  <loc>${`https://blog.object1037.dev${path}`}</loc>
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