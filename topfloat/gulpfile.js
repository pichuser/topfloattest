'use strict';

var gulp = require('gulp');
var templateCache = require('gulp-angular-templatecache');
var jade = require('gulp-jade');
var webserver = require('gulp-webserver');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var concatCss = require('gulp-concat-css');
var gutil = require('gulp-util');

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
        }))
        .on('error', console.log)
    .pipe(gulp.dest('app/public/'))
});


gulp.task('templatecache', ['jade'], function () {
	return gulp.src(['app/public/**/*.html', 'app/directives/**/*.html', 'app/directives/**/**/*.html'])
      .pipe(templateCache(
        {
        	module: 'testDirectives'
        }
        ))
      .pipe(gulp.dest('app/src'));
});


gulp.task('webserver', function () {
	gutil.log('hhhh');
	gulp.src('app')
      .pipe(webserver({
      	host: '192.168.3.120',
      	livereload:
		{
			enable: true,
			filter: function (fileName) {
				if (fileName.match(/data.txt$/)
					|| fileName.match(/\\directives\\/)
					|| fileName.match(/\\public\\/)) {
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
	gulp.run('templatecache');
	gulp.run('concatcss');
	gulp.run('scripts');
	gulp.watch('app/directives/**/*.jade', ['templatecache']);
	gulp.watch('app/directives/**/*.sass', ['concatcss']);
	gulp.watch('app/directives/**/*.js', ['scripts']);
	gulp.run('webserver');
});
