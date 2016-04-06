#!/usr/bin/env node
var fs      = require('fs')
var iterate = require('./deps')

// the files to check
var files = [
  'gulpfile.js'
, 'gulpfile.babel.js'
]

iterate(files, function (deps) {

  deps.forEach(function (dep) {
    fs.readFile(dep, function (err, buf) {
      if ( err ) {
        // ignore
      } else {
        var content = buf.toString()
        var tasks = /gulp\.task\(['"]([^'"]+)['"]/g

        while ( (match = tasks.exec(content)) !== null ) {
          console.log(match[1])
        }
      }
    })
  })
})
