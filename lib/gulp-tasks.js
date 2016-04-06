#!/usr/bin/env node
var fs      = require('fs')
var iterate = require('./deps')
var findup  = require('./findup')

// the files to check
var files = [
  'gulpfile.js'
, 'gulpfile.babel.js'
, 'Gulpfile.js'
, 'Gulpfile.babel.js'
]

var gulpfile = findup(files)

if ( gulpfile ) {
  iterate([ gulpfile ], function (deps) {
    deps.forEach(function (dep) {
      fs.readFile(dep, function (err, buf) {
        if ( err ) {
          // ignore
        } else {
          var content = buf.toString()
          var tasks = /gulp\.task\( *['"]([^'"]+)['"]/g

          while ( (match = tasks.exec(content)) !== null ) {
            console.log(match[1])
          }
        }
      })
    })
  })
}
