var path = require('path')
var fs   = require('fs')

// finds a file in files, in this directory or in higher directories
var findup = function (files, _pwd) {
  var pwd = path.resolve(_pwd || '.')

  const found = files.reduce(function (res, file) {
    var full = path.resolve(pwd, file)
    try {
      // throws if file is not accessible
      fs.accessSync(full, fs.F_OK | fs.R_OK)
      return full
    } catch (err) {
      return res
    }
  }, false)

  if ( found ) {
    return found
  } else if ( pwd !== '/' ) {
    // look one directory up
    return findup(files, path.dirname(pwd))
  } else {
    // nothing was found
    return false
  }
}

module.exports = findup
