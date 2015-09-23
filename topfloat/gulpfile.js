'use strict';

var gulp = require('gulp');
var sass = require('gulp-ruby-sass');

gulp.task('sass', function () {
    return sass('app/bower_components/bootstrap-sass/assets/stylesheets/main.scss')
      .on('error', sass.logError)
      .pipe(gulp.dest('app'));
});

gulp.task('sass:watch', function () {
    gulp.watch('app/bower_component/bootstrap-sass/assets/stylesheets/main.scss', ['sass']);
});