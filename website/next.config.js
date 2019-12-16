const withHashicorp = require('@hashicorp/nextjs-scripts')
const path = require('path')

module.exports = withHashicorp({
  defaultLayout: true,
  transpileModules: ['is-absolute-url'],
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

    // Add polyfills
    const originalEntry = config.entry
    config.entry = async () => {
      const entries = await originalEntry()
      let polyEntry = entries['static/runtime/polyfills.js']
      if (polyEntry && !polyEntry.includes('./lib/polyfills.js')) {
        if (!Array.isArray(polyEntry)) {
          entries['static/runtime/polyfills.js'] = [polyEntry]
        }
        entries['static/runtime/polyfills.js'].unshift('./lib/polyfills.js')
      }
      return entries
    }

    return config
  },
  env: {
    HASHI_ENV: process.env.HASHI_ENV
  }
})
