'use strict';

var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var concat = require('gulp-concat');
var shell = require('gulp-shell')

gulp.task('default', ['scripts', 'htmldirectives', 'sass', 'npmcommand']);

gulp.task('npmcommand', shell.task([
  'npm start'
]))

gulp.task('sass', function () {
    return sass('app/bower_components/bootstrap-sass/assets/stylesheets/main.scss')
      .on('error', sass.logError)
      .pipe(gulp.dest('app'));
});

gulp.task('scripts', function () {
    return gulp.src(['app/directives/*/*.js', 'app/directives/testDirectiveMainApp.js'])
      .pipe(concat('all.js'))
      .pipe(gulp.dest('app/src'));
});

gulp.task('htmldirectives', function () {
    return gulp.src('app/directives/*/*.html')
        .pipe(concat('alldirectives.html'))
        .pipe(gulp.dest('app/src'));
});

gulp.task('sass:watch', function () {
    gulp.watch('app/bower_component/bootstrap-sass/assets/stylesheets/main.scss', ['sass']);
});