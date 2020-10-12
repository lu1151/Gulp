const x = 100;
let y = 200;
gulp.task("copy", (callback) => {
	gulp.src("./src/images/*").pipe(gulp.dest("dist/images"));
	gulp.src("./src/lib/*").pipe(gulp.dest("dist/lib"));
	callback();
  });