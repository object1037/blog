const rehypePrism = require('@mapbox/rehype-prism')
const withMDX = require('@next/mdx')({
  extension: /\.mdx$/,
  options: {
    rehypePlugins: [rehypePrism]
  },
})

const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline';
  child-src 'none';
  style-src 'self' 'unsafe-inline';
  img-src * blob: data:;
  media-src 'none';
  connect-src *;
  font-src 'self';
`

const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on'
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block'
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY'
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin'
  },
  {
    key: 'Content-Security-Policy',
    value: ContentSecurityPolicy.replace(/\n/g, '')
  }
];

module.exports = withMDX({
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  webpack(config, { dev, isServer }) {
    if (isServer) {
      import('./utils/generateSitemap.mjs')
      .then((mod) => {
        mod.default()
      })
    }

    return config
  },
  async headers() {
    return [
      {
        // Apply these headers to all routes in your application.
        source: '/(.*)',
        headers: securityHeaders,
      },
    ]
  },
})