# blog

My blog system created with [Next.js](https://nextjs.org/), [Tailwind CSS](https://tailwindcss.com/), [MDX](https://github.com/mdx-js/mdx), etc.

## Usage

```bash
npm install
npm run dev
```

In order to enable the search feature, add environment variables referring to `.env.example`.

Edit the following files if you need.

 * `constants/data.ts`: General data
 * `posts/[YYYYMMDD].mdx`: Blog post
 * `public/images/*`: Images

You can see full features in `posts/testPost.mdx`.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fobject1037%2Fblog&project-name=blog&repo-name=blog)