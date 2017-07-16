var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BACKEND_PROJECT_HOST: '"http://localhost:3001"',
  BACKEND_PICTURE_HOST: '"http://localhost:3002"',
  BACKEND_CAPTURE_HOST: '"http://localhost:3003"' 
})
