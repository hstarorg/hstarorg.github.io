'use strict';

var gulp = require('gulp');
var del = require('del');
var browserSync = require('browser-sync').create();

gulp.task('serve', () => {
  browserSync.init({
    server: {
      baseDir: './dist'
    },
    ghostMode: false,
    port: 7410
  })
});

gulp.task('copy', () =>
  gulp.src('./src/**')
    .pipe(gulp.dest('./dist'))
);

//开发
gulp.task('dev', gulp.series('copy', 'serve'));

//发布
gulp.task('publish', gulp.series('dev'));
