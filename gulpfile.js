/* Gulp packages */
var gulp = require('gulp'),
    path = require('path'),
    watch = require('gulp-watch'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    compass = require('gulp-compass'),
    minifyCSS = require('gulp-minify-css'),
    angularTemplates = require('gulp-angular-templates');

/* Global variables */
var global_file_name = 'main';

/* DIRS */
var assets_dir = 'assets';
var static_dir = 'staticfiles';
var bower_dir = 'bower_components';
var sass_dir = assets_dir + '/sass';
var js_dir = assets_dir + '/js';
var template_dir = assets_dir + '/templates';

/* JS-files to compile */
var jsFiles = [
        bower_dir + '/lodash/dist/lodash.js',
        bower_dir + '/angularjs/angular.js',
        bower_dir + '/angular-ui-router/release/angular-ui-router.js',
        bower_dir + '/restangular/dist/restangular.js',
        bower_dir + '/angular-bootstrap/ui-bootstrap.js',
        bower_dir + '/angular-bootstrap/ui-bootstrap-tpls.js',
//        bower_dir + '/jquery/dist/jquery.js',
//        bower_dir + '/bootstrap/dist/js/bootstrap.js',
        js_dir + '/**/*.js' // Leave this here
];

/* Javascript task */
gulp.task('build-js', function () {
    gulp.src(jsFiles)
        .pipe(concat(global_file_name + '.js'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest(static_dir + '/js'))
});

/* Sass task */
gulp.task('build-sass', function() {
    gulp.src([sass_dir + '/main.scss']).
        pipe(compass({
            config_file: 'config.rb',
            sass: sass_dir
        })).
        pipe(concat(global_file_name + '.css')).
        pipe(rename({suffix: '.min'})).
        pipe(minifyCSS({})).
        pipe(gulp.dest(static_dir + '/css'));
});

/* Angular templates task */
gulp.task('build-templates', function () {
    return gulp.src(template_dir + '/**/*.html')
        .pipe(angularTemplates({module: 'mainModule'}))
        .pipe(gulp.dest(js_dir + '/templates'));
});

/* Watch tasks */
gulp.task('watch', function () {
    gulp.watch(js_dir + '/**/*.js', ['build-js']);
    gulp.watch(assets_dir + '/templates/**/*.html', ['build-templates']);
    gulp.watch(sass_dir + '/**/*.scss', ['build-sass']);
});

gulp.task('default', ['watch']);