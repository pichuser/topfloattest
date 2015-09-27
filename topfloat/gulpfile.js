'use strict';

var gulp = require('gulp');
var templateCache = require('gulp-angular-templatecache');
var jade = require('gulp-jade');
var webserver = require('gulp-webserver');



gulp.task('jade', function () {
    return gulp.src(['app/directives/**/*.jade', '!./assets/template/_*.jade'])
        .pipe(jade({
            pretty: true
        }))  // Собираем Jade только в папке ./assets/template/ исключая файлы с _*
        .on('error', console.log) // Если есть ошибки, выводим и продолжаем
    .pipe(gulp.dest('app/public/')) // Записываем собранные файлы
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
    // Предварительная сборка проекта
    gulp.watch('app/directives/**/*.jade', function () {
        gulp.run('templatecache');
    });
});