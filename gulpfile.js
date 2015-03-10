var gulp = require('gulp')
var jshint = require('gulp-jshint')
var minifyHTML = require('gulp-minify-html');

gulp.task('jshint', function() {
  gulp.src('./src/**/*.js')
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
