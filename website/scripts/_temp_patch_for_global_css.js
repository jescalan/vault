// TEMPORARY - a patch for enabling css support as intended
const fs = require('fs')
const path = require('path')

// rewrite webpack config to match what our custom postcss config
fs.writeFileSync(
  path.join(__dirname, '../node_modules/next/dist/build/webpack-config.js'),
  fs.readFileSync(
    path.join(__dirname, '_temp_nextjs_webpack_config_patch.txt'),
    'utf8'
  )
)

// rewrite nextjs-scripts config to remove next-css
fs.writeFileSync(
  path.join(__dirname, '../node_modules/@hashicorp/nextjs-scripts/index.js'),
  fs.readFileSync(
    path.join(__dirname, '_temp_next_hashicorp_config_patch.txt'),
    'utf8'
  )
)
