var gulp = require('gulp');
var sass = require('gulp-sass');
var cleancss = require('gulp-clean-css');
var csscomb = require('gulp-csscomb');
var rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');

// configure the paths
var watch_dir = './scss/**/*.scss';
var src_dir = './scss/*.scss';
var dest_dir = './css-compiled';

var paths = {
    source: src_dir
};

gulp.task('watch', function() {
  gulp.watch(watch_dir, ['build']);
});

gulp.task('build', function() {
  gulp.src(paths.source)
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'compact', precision: 10}))
    .pipe(autoprefixer())
    .pipe(csscomb())
    .pipe(sourcemaps.write('.',{includeContent:false, sourceRoot: '../'}))
    .pipe(gulp.dest(dest_dir))
    .pipe(cleancss())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest(dest_dir));
});

gulp.task('default', ['build']);
