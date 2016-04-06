var path = require('path')
var fs   = require('fs')

var resolve = function (dir, filename) {
  if ( path.isAbsolute(filename) || filename[0] === '.' ) {
    if ( /.js$/.test(filename) ) {
      // file name
      return path.resolve(dir, filename)
    } else {
      return path.resolve(dir, filename) + '.js'
    }
  } else {
    // module name
    return filename
  }
}

module.exports = function (files, done) {
  // list of files and wether we've visited them already
  var cache = {}
  var stack = files.map(function (fname) {
    return path.resolve('.', resolve('.', fname))
  })

  var deps = function (filename) {
    fs.readFile(filename, function (err, buf) {
      if ( err ) {
        // ignore
        cache[filename] = true
        iterate()
      } else {
        cache[filename] = true
        var content = buf.toString()
        var dir     = path.dirname(filename)

        var requires = /require\(['"]([^'"]+)['"]\)/g
        var imports  = /import .+ from ['"]([^'"]+)['"]/g

        var match;
        while ( (match = requires.exec(content)) !== null ) {
          var m = resolve(dir, match[1])
          cache[m] = cache[m] || false
          stack.push(m)
        }

        while ( (match = imports.exec(content)) !== null ) {
          var m = resolve(dir, match[1])
          cache[m] = cache[m] || false
          stack.push(m)
        }

        iterate()
      }
    })
  }

  var iterate = function () {
    if ( stack.length > 0 ) {
      // get file from the stack
      var file = stack.pop()

      if ( cache[file] ) {
        iterate()
      } else {
        // look for deps in the file and put them on the stack
        deps(file)
      }
    } else {
      done(Object.keys(cache))
    }
  }

  iterate()
}
