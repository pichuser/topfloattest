'use strict';

var gulp = require('gulp');
var templateCache = require('gulp-angular-templatecache');
var jade = require('gulp-jade');
var webserver = require('gulp-webserver');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var concatCss = require('gulp-concat-css');
var connect = require('gulp-connect');

gulp.task('concatcss', ['sass'], function () {
	return gulp.src('app/public/**/*.css')
      .pipe(concatCss("bundle.css"))
      .pipe(gulp.dest('app/styles/'));
});

gulp.task('scripts', function () {
	return gulp.src(['app/directives/**/*.js'])
        .pipe(concat('all.js'))
        .pipe(gulp.dest('app/src'))
})

gulp.task('sass', function () {
	return gulp.src('app/directives/**/*.sass')
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest('app/public'));
});

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
	gulp.src('app')
      .pipe(webserver({
      	host: '192.168.3.120',
      	livereload:
		{
			enable: true,
			filter: function (fileName) {
				if (fileName.match(/data.txt$/)) { // exclude all source maps from livereload 
					return false;
				} else {
					return true;
				}
			}
		},
      	//directoryListing: true,
      	open: true,
		fallback: 'jlakjlaksjdflaksjdlfkajsdf',
      	proxies: [{ source: '/getsavedform', target: 'http://localhost:3000/getsavedform', options: {} },
      	{ source: '/testform', target: 'http://localhost:3000/testform', options: {} }]
      }));
});

gulp.task('watch', function () {
	// Предварительная сборка проекта
	gulp.watch('app/directives/**/*.jade', ['templatecache']);
	gulp.watch('app/directives/**/*.sass', ['concatcss']);
	gulp.watch('app/directives/**/*.js', ['scripts']);
	gulp.run('webserver');
});


gulp.task('connect', function () {
	connect.server({
		root: 'app',
		livereload: true
	});
});

gulp.task('html', function () {
	gulp.src('app/*.html')
	  .pipe(connect.reload());
});

gulp.task('watch1', function () {
	gulp.watch(['app/*.html'], ['html']);
	gulp.watch(['app/public/*.js', 'app/src/*.js'], ['html']);
});

gulp.task('default1', ['connect', 'watch', 'watch1']);