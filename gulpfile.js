const gulp = require('gulp');
const browserSync = require('browser-sync');
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const rename = require("gulp-rename");
const htmlmin = require('gulp-htmlmin');

gulp.task('server', function () {

    browserSync({
        server: {
            baseDir: "dist"
        }
    });

    gulp.watch("dist/*.html").on('change', browserSync.reload);
});

gulp.task('watch', function () {
    gulp.watch("src/sass/**/*.+(scss|sass)", gulp.parallel('styles'));
    gulp.watch("src/*.html").on('change', gulp.parallel('minifyHtml'));
});

gulp.task('styles', function () {
    return gulp.src("./src/sass/**/*.+(scss|sass|css)")
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(rename({ suffix: '.min', prefix: '' }))
        .pipe(autoprefixer())
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(gulp.dest("dist/css"))
        .pipe(browserSync.stream());
});

gulp.task('minifyHtml', () => {
    return gulp.src('src/*.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('dist/'));
});

gulp.task('img', function () {
    return gulp.src('src/img/*')
        .pipe(gulp.dest('dist/img/'))
});

gulp.task('video', function () {
    return gulp.src('src/video/*')
        .pipe(gulp.dest('dist/video/'))
});

gulp.task('default', gulp.parallel('watch', 'server', 'styles', 'minifyHtml', 'img', 'video'));