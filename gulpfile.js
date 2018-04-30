var gulp = require("gulp")
var connect = require("gulp-connect")
var less = require("gulp-less")
gulp.task("html",function() {
    gulp.src("./src/index.html")             //读取文件
        .pipe(gulp.dest("./dist"))
        .pipe(connect.reload())           //输出文件
})
gulp.task("watch",function() {
    gulp.watch("./src/index.html",["html"]);
    gulp.watch("./src/less/*.less",["less"]);
    gulp.watch("./src/js/*js",["js"])
})
gulp.task("server",function() {
    connect.server({
        root:"./dist",
        livereload: true
    })
})
gulp.task("less",function() {
    gulp.src("./src/less/*.less")
        .pipe(connect.reload())
        .pipe(less())
        .pipe(gulp.dest("./dist/css"))
})
gulp.task("js",function() {
    gulp.src("./src/js/*.js")
        .pipe(gulp.dest("./dist/js"))
        .pipe(connect.reload())
})
gulp.task("default",["html","watch","server","less","js"])