var gulp = require('gulp')
var bower = require('gulp-bower')
var jshint = require('gulp-jshint')
var minifyHTML = require('gulp-minify-html');
var concat = require('gulp-concat');
var stripDebug = require('gulp-strip-debug');
var uglify = require('gulp-uglify');

var scriptInput = './src/scripts/**/*.js';
var htmlInput = './src/**/*.html';

gulp.task('bower', function() {
  bower();
});

gulp.task('jshint', function() {
  gulp.src(scriptInput)
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('htmlpage', function() {
  var htmlDst = './build';

  gulp.src(htmlInput)
    .pipe(minifyHTML())
    .pipe(gulp.dest(htmlDst));
});

gulp.task('scripts', ['bower', 'jshint'], function() {
  gulp.src([
        './bower_components/**/*.js',
        '!./bower_components/**/*.min.js',
        '!./bower_components/**/src/**/*',
        '!./bower_components/**/gulpfile.js',
        scriptInput])
    .pipe(concat('script.js'))
    .pipe(stripDebug())
    .pipe(uglify())
    .pipe(gulp.dest('./build/scripts/'));
});

gulp.task('default', ['htmlpage', 'scripts'], function() { });

gulp.task('watch', ['default'], function() {
  gulp.watch(htmlInput, ['htmlpage']);

  gulp.watch(scriptInput, ['scripts']);
});
