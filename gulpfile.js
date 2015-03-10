var gulp = require('gulp')
var bower = require('gulp-bower')
var jshint = require('gulp-jshint')
var minifyHTML = require('gulp-minify-html');
var concat = require('gulp-concat');
var stripDebug = require('gulp-strip-debug');
var uglify = require('gulp-uglify');

gulp.task('bower', function() {
  bower();
});

gulp.task('jshint', function() {
  gulp.src('./src/scripts/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('htmlpage', function() {
  var htmlSrc = './src/**/*.html';
  var htmlDst = './build';

  gulp.src(htmlSrc)
    .pipe(minifyHTML())
    .pipe(gulp.dest(htmlDst));
});

gulp.task('scripts', function() {
  gulp.src([
        './bower_components/**/*.js',
        '!./bower_components/**/*.min.js',
        '!./bower_components/**/src/**/*',
        '!./bower_components/**/gulpfile.js',
        './src/scripts/**/*.js'])
    .pipe(concat('script.js'))
    .pipe(stripDebug())
    .pipe(uglify())
    .pipe(gulp.dest('./build/scripts/'));
});

gulp.task('default', ['htmlpage', 'scripts'], function() { });
