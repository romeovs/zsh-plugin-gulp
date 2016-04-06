
# save the plugin directory, so we can find our
# javascripts
PLUGDIR=`dirname ${0:a}`

function _gulp_tasks () {
  node "$PLUGDIR/lib/gulp-tasks.js" "$@"
}

function _gulp () {
  local -a tasks
  tasks=$(_gulp_tasks | sort)
  compls=(${=tasks})

  _arguments \
    '-v[show version]' \
    '*::task:( $compls )'
}

compdef _gulp gulp
