const gulp = require("gulp");
const { parallel } = require("gulp");
const htmlmin = require("gulp-htmlmin");
const fileinclude = require("gulp-file-include");
const less = require("gulp-less");
const csso = require("gulp-csso");
const babel = require("gulp-babel");
const uglify = require("gulp-uglify");

// task
gulp.task("first", () => {
  return gulp.src("./src/css/base.css").pipe(gulp.dest("dist/css"));
  callback();
});

// file-include then htmlmin
function htmlClean() {
  return gulp
    .src("./src/*html")
    .pipe(fileinclude())
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("dist"));
}

// less to css then minify
function cssClean() {
  return gulp
    .src(["./src/css/*.less", "./src/css/*.css"])
    .pipe(less())
    .pipe(csso())
    .pipe(gulp.dest("dist/css"));
}

// ES6 to ES5 then minify
function jsClean() {
  return gulp
    .src("./src/js/*.js")
    .pipe(
      babel({
        presets: ["@babel/env"],
      })
    )
    .pipe(uglify())
    .pipe(gulp.dest("dist/js"));
}

// copy other files
function copyFile(callback) {
  gulp.src("./src/images/*").pipe(gulp.dest("dist/images"));
  gulp.src("./src/lib/*").pipe(gulp.dest("dist/lib"));
  callback();
}

// exports default
exports.default = parallel(copyFile, jsClean, cssClean, htmlClean);
