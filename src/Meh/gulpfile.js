/// <binding BeforeBuild='build' Clean='clean' ProjectOpened='build' />
"use strict";

var gulp = require("gulp"),
    inject = require("gulp-inject"),
    rimraf = require("rimraf"),
    concat = require("gulp-concat"),
    cssmin = require("gulp-cssmin"),
    uglify = require("gulp-uglify");

var paths = {
    webroot: "./wwwroot/"
};

paths.jsDep = paths.webroot + "lib/**/*.js";
paths.minJsDep = paths.webroot + "lib/**/*.min.js";
paths.js = paths.webroot + "scripts/**/*.js";
paths.css = paths.webroot + "css/**/*.css";
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

gulp.task("build",
    function() {
        var target = gulp.src('./wwwroot/index.html');
        var sources = gulp.src([paths.minJsDep, paths.js, paths.css], { read: false });

        return target.pipe(inject(sources, { ignorePath: 'wwwroot/', addRootSlash: false }))
          .pipe(gulp.dest('./wwwroot'));
    });

gulp.task('watch', function () {
    return gulp.watch([paths.minJsDep, paths.js, paths.css], ['build']);
});

gulp.task("min", ["min:js", "min:css"]);
