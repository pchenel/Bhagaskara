var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var rename = require("gulp-rename");
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync');

var Files = {
        html: './index.html',
        css_dest: './css',
        sass: './sass/main.scss'
};

gulp.task('scss', function() {
    return sass(Files.sass, {
        style: 'expanded',
        sourcemap: true
    })
        .on('error', sass.logError)
        .pipe(sourcemaps.write())
        .pipe(rename('main.css'))
        .pipe(gulp.dest(Files.css_dest))
        .pipe(browserSync.reload({stream: true}));
})
gulp.task('default', ['scss'], function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch('sass/**/*.scss', ['scss']);
    gulp.watch(Files.html, browserSync.reload);
});
