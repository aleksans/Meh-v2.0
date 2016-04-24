/// <binding BeforeBuild='build' Clean='clean' ProjectOpened='build' />
"use strict";

var gulp = require("gulp"),
    inject = require("gulp-inject"),
    rimraf = require("rimraf"),
    concat = require("gulp-concat"),
    cssmin = require("gulp-cssmin"),
    uglify = require("gulp-uglify"),
    sass = require('gulp-sass');

var paths = {
    webroot: "./wwwroot/"
};

paths.jsDep = paths.webroot + "lib/**/*.js";
paths.minJsDep = paths.webroot + "lib/**/*.min.js";
paths.js = paths.webroot + "scripts/**/*.js";
paths.css = paths.webroot + "css/**/*.css";
paths.scss = paths.webroot + "css/**/*scss";
paths.minCss = paths.webroot + "css/**/*.min.css";
paths.concatJsDest = paths.webroot + "js/site.min.js";
paths.concatCssDest = paths.webroot + "css/site.min.css";

gulp.task("clean:js", function (cb) {
    rimraf(paths.concatJsDest, cb);
});

gulp.task("clean:css", function (cb) {
    rimraf(paths.concatCssDest, cb);
});

gulp.task("clean", ["clean:js", "clean:css"]);

gulp.task("min:js", function () {
    return gulp.src([paths.js, "!" + paths.minJs], { base: "." })
        .pipe(concat(paths.concatJsDest))
        .pipe(uglify())
        .pipe(gulp.dest("."));
});

gulp.task("min:css", function () {
    return gulp.src([paths.css, "!" + paths.minCss])
        .pipe(concat(paths.concatCssDest))
        .pipe(cssmin())
        .pipe(gulp.dest("."));
});

gulp.task("build", ["build-sass", "build-html"]);

gulp.task("build-html", function() {
    var target = gulp.src('./wwwroot/index.html');
    var sources = gulp.src([paths.minJsDep, paths.js, paths.css], { read: false });

    return target.pipe(inject(sources, { ignorePath: 'wwwroot/', addRootSlash: false }))
      .pipe(gulp.dest('./wwwroot'));
});

gulp.task("build-sass",
    function () {
        return gulp.src(paths.scss)
            .pipe(sass())
            .pipe(gulp.dest(paths.webroot + 'css/'));
    });

gulp.task('watch', function () {
    return gulp.watch(["scripts/**/*.js", "css/**/*.scss", "views/**/*.html"], { cwd: paths.webroot }, ['build']);
});

gulp.task("min", ["min:js", "min:css"]);
