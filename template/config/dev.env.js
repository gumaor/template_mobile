'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_URL: '"http://192.168.0.226:8091/pc/"',
  AUTH_URL: '"/?r=123#/?token=123"'
})
