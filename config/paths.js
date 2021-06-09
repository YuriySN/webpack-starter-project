const path = require('path');

module.exports = {
  source: path.resolve(__dirname, '../src/'),
  output: path.resolve(__dirname, '../dist/'),
}

// update all dependensis
// npx npm-check-updates -u
// rm -rf node_modules
// npm install