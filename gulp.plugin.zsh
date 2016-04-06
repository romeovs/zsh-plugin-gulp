
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
    {-v,--version}'[display the global and local gulp versions]' \
    '--require[require a module before running the gulpfile]' \
    {-T,--tasks}'[display the task dependency tree for the loaded gulpfile]' \
    '--gulpfile[manually set path of gulpfile]:file:_files' \
    '--cwd[manually set the CWD]:directory:_directories' \
    '--tasks-simple[display a plaintext list of tasks for the loaded gulpfile]' \
    '--color[force gulp and gulp plugins to display colors]' \
    '--no-color[force gulp and gulp plugins to not display colors]' \
    '--silent[disable all gulp logging]' \
    '*::task:( $compls )'
}

compdef _gulp gulp
