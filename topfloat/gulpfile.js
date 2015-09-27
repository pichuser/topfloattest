'use strict';

var gulp = require('gulp');
var templateCache = require('gulp-angular-templatecache');
var jade = require('gulp-jade');
var webserver = require('gulp-webserver');



gulp.task('jade', function () {
    return gulp.src(['app/directives/**/*.jade', '!./assets/template/_*.jade'])
        .pipe(jade({
            pretty: true
        }))  // �������� Jade ������ � ����� ./assets/template/ �������� ����� � _*
        .on('error', console.log) // ���� ���� ������, ������� � ����������
    .pipe(gulp.dest('app/public/')) // ���������� ��������� �����
});


gulp.task('templatecache', ['jade'], function () {
    return gulp.src(['app/public/**/*.html', 'app/directives/**/*.html', 'app/directives/**/**/*.html'])
      .pipe(templateCache(
        {
            module: 'testDirectives'
        }
        ))
      .pipe(gulp.dest('app/public'));
});


gulp.task('webserver', function () {
    gulp.src('')
      .pipe(webserver({
          livereload: true,
          directoryListing: true,
          open: true
      }));
});

gulp.task('watch', function () {
    // ��������������� ������ �������
    gulp.watch('app/directives/**/*.jade', function () {
        gulp.run('templatecache');
    });
});