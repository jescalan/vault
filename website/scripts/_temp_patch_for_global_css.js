// TEMPORARY - a patch for enabling css support as intended
const fs = require('fs')
const path = require('path')

// rewrite nextjs-scripts config to remove next-css
fs.writeFileSync(
  path.join(__dirname, '../node_modules/@hashicorp/nextjs-scripts/index.js'),
  fs.readFileSync(
    path.join(__dirname, '_temp_next_hashicorp_config_patch.txt'),
    'utf8'
  )
)
