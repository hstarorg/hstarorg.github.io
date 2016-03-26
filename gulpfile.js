'use strict';

var gulp = require('gulp');
var del = require('del');
var browserSync = require('browser-sync').create();
var concat = require('gulp-concat');

gulp.task('serve', (done) => {
  browserSync.init({
    server: {
      baseDir: './dist'
    },
    ghostMode: false,
    port: 7410
  });
  done();
});

gulp.task('copySrc', () =>
  gulp.src('./src/**')
    .pipe(gulp.dest('./dist'))
);

gulp.task('copyAssets', () =>
  gulp.src('./assets/**')
    .pipe(gulp.dest('./dist/assets/'))
);

gulp.task('watch', () => {
  return gulp.watch(['src/**/*', 'assets/**/*'], gulp.series('copyAssets', 'copySrc', () => browserSync.reload()))
});

//开发
gulp.task('dev', gulp.series('copyAssets', 'copySrc', 'serve', 'watch'));

//发布
gulp.task('publish', gulp.series('dev'));
