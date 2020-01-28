var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var livereload = require('gulp-livereload');
var concat = require('gulp-concat');
var image = require('gulp-image');

const defaultjs = 'src/js/',
    paths = {
        html: {
            src: 'src/**/*.html',
            dest: 'dist/'
        },
        sass: {
            src: 'src/styles/style/**/*.scss',
            dest: 'dist/styles/style',
            output: 'main.css'
        },
        fonts: {
            src: 'src/styles/fonts/*',
            dest: 'dist/styles/fonts'
        },
        images: {
            src: 'src/styles/images/**/*',
            dest: 'dist/styles/images'
        },
        js: {
            src: [
                defaultjs + 'main.js',
                defaultjs + 'utilities/uiController.js',
                defaultjs + 'utilities/storageController.js',
                defaultjs + 'utilities/*.js',
                defaultjs + 'components/*.js'
            ],
            src1: 'src/js/main.js',
            src2: 'src/js/utilities/uiController.js',
            src3: 'src/js/utilities/storageController.js',
            src4: 'src/js/utilities/*.js',
            src5: 'src/js/components/*.js',
            dest: 'dist/js',
            output: 'main.js'
        }
    };

function styles() {
    return gulp
        .src(paths.sass.src)
        .pipe(concat(paths.sass.output))
        .pipe(sass({ outputStyle: 'compressed' }))
        .on('error', sass.logError)
        .pipe(
            autoprefixer({
                cascade: false
            })
        )
        .pipe(gulp.dest(paths.sass.dest))
        .pipe(livereload());
}

function js() {
    return gulp
        .src([
            paths.js.src1,
            paths.js.src2,
            paths.js.src3,
            paths.js.src4,
            paths.js.src5
        ])
        .pipe(concat(paths.js.output))
        .pipe(gulp.dest(paths.js.dest))
        .pipe(livereload());
}

function html() {
    return gulp
        .src(paths.html.src)
        .pipe(gulp.dest(paths.html.dest))
        .pipe(livereload());
}

function images() {
    return gulp
        .src(paths.images.src)
        .pipe(gulp.dest(paths.images.dest))
        .pipe(livereload());
}

function buildImages() {
    return gulp
        .src(paths.images.src)
        .pipe(image())
        .pipe(gulp.dest(paths.images.dest));
}

function fonts() {
    return gulp
        .src(paths.fonts.src)
        .pipe(gulp.dest(paths.fonts.dest))
        .pipe(livereload());
}

gulp.task('watch', function() {
    livereload.listen();

    gulp.watch(paths.sass.src, gulp.series(styles));
    gulp.watch(paths.js.src1, gulp.series(js));
    gulp.watch(paths.js.src2, gulp.series(js));
    gulp.watch(paths.js.src3, gulp.series(js));
    gulp.watch(paths.js.src4, gulp.series(js));
    gulp.watch(paths.js.src5, gulp.series(js));
    gulp.watch(paths.html.src, gulp.series(html));
});

gulp.task('build', gulp.parallel(styles, images, fonts, js, html, 'watch'));
gulp.task('prod', gulp.parallel(styles, buildImages, fonts, js, html));
gulp.task('default', gulp.parallel(styles, buildImages, fonts, js, html));
