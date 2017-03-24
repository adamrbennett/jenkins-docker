var gulp = require('gulp');
var rename = require('gulp-rename');
var ngConstant = require('gulp-ng-constant');
var Server = require('karma').Server;

gulp.task('test', ['config'], function (done) {
  new Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done).start();
});

gulp.task('config', function () {
  var config = {
    apiRoot: process.env.API_ROOT || 'No API_ROOT environment variable specified'
  };
  ngConstant({
    name: 'constants',
    constants: config,
    stream: true,
    wrap: false
  })
  .pipe(rename('constants.module.js'))
  .pipe(gulp.dest('./main'));
});
