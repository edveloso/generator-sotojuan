#!/usr/bin/env node
'use strict'

const meow = require('meow')
const <%= camelModuleName %> = require('./')

const cli = meow([
  'Usage',
  '  $ <%= moduleName %> [input]',
  '',
  'Examples',
  '  $ <%= moduleName %>',
  '  I am cool - Juan',
  '  $ <%= moduleName %> - Jennifer',
  '  I am cool - Jennifer'
])

console.log(<%= camelModuleName %>(cli.input[0] || 'Juan'))
