const withHashicorp = require('@hashicorp/nextjs-scripts')
const path = require('path')

module.exports = withHashicorp({
  defaultLayout: true,
  mdx: { resolveIncludes: path.join(__dirname, 'pages') }
})({
  experimental: {
    css: true,
    granularChunks: true,
    rewrites: () => [
      {
        source: '/api/:path*',
        destination: '/api-docs/:path*'
      }
    ]
  },
  exportTrailingSlash: true,
  webpack(config) {
    // Add yaml loader
    config.module.rules.push({
      test: /\.yml$/,
      use: [
        { loader: path.join(__dirname, 'node_modules/json-loader') },
        { loader: path.join(__dirname, 'node_modules/yaml-loader') }
      ]
    })

    return config
  }
})
