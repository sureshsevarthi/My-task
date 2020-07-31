var gulp = require("gulp");
var source = require("vinyl-source-stream");
var buffer = require("vinyl-buffer");
var watch = require("gulp-watch");
var gutil = require("gulp-util");
var browserify = require("browserify");
var babel = require("gulp-babel");
var connect = require("gulp-connect");
var open = require("gulp-open");

gulp.task("transform", function() {
  return gulp
    .src(["./src/**/*.jsx", "./src/**/*.js"])
    .pipe(
      babel({
        presets: ["@babel/react", "@babel/preset-env"]
      })
    )
    .pipe(gulp.dest("./dist"));
});

gulp.task(
  "js",
  gulp.series("transform", function() {
    return browserify("./dist/index.js")
      .bundle()
      .on("error", gutil.log)
      .pipe(source("./src/index.js"))
      .pipe(buffer())
      .pipe(gulp.dest("./"))
      .pipe(connect.reload());
  })
);

gulp.task("watch", function() {
  gulp.watch("./src/**/*.jsx", gulp.series("js"));
  gulp.watch("./src/**/*.js", gulp.series("js"));
  gulp.watch("./src/**/*.css", gulp.series("copy"));
});

gulp.task("copy", function() {
  return gulp.src("./src/**/*.css").pipe(gulp.dest("./css"));
});

gulp.task("default", gulp.parallel("watch", "copy"));
