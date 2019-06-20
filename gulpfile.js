// gulp.task('default', function() {
//   // 回调
//   // 将你的默认的任务代码放在这
//   console.log('122')
// });
// less-->自动添加css3前缀-->压缩-->css文件
// 最基础的4个API
// gulp.src()
// gulp.dest()
// gulp.task()
// gulu.watch()


var gulp = require('gulp');
var folder = {
	src: 'src/',
	dist: 'dist/'
}
// 压缩html
// gulp中插件应用 下载插件-->取到插件-->应用插件
var htmlClean = require('gulp-htmlclean');
// 压缩图片
var imagemin = require('gulp-imagemin');
// 压缩js
var uglify = require('gulp-uglify');
// 去掉js的调试语句
var debug = require('gulp-strip-debug');
// less->css
var less = require('gulp-less')
// 压缩css
var cleancss = require('gulp-clean-css')
// css自动添加前缀
var postcss = require('gulp-postcss');
// 注意这里下载的是autoprefixer
var autoprefixer = require('autoprefixer');
// 开启服务器
var connect = require('gulp-connect');

// 怎么设置当前环境变量git下export NODE_ENV=development   cmd是set
// 判断当前环境变量"development","production"
var devMod = process.env.NODE_ENV == "development"
// console.log(devMod)
// 创建任务
gulp.task("html", function () {
	// 读取所有的html文件
	var page = gulp.src(folder.src + 'html/*')
		.pipe(connect.reload())
	// 变成文件流放入管道,压缩html文件
	if (!devMod) {
		page.pipe(htmlClean())
	}

	// 写入js文件到dist/html/
	page.pipe(gulp.dest(folder.dist + 'html/'))

})
gulp.task("css", function () {
	// 读取所有的css文件
	var page = gulp.src(folder.src + 'css/*')
		.pipe(connect.reload())
		// less->css
		.pipe(less())
		// css自动添加前缀
		.pipe(postcss([autoprefixer()]))
		// 压缩css
		if (!devMod) {
			page.pipe(cleancss())
		}
		
		// 写入js文件到dist/css/
		page.pipe(gulp.dest(folder.dist + 'css/'))

})
gulp.task("js", function () {
	// 读取所有的js文件
	var page = gulp.src(folder.src + 'js/*')
		.pipe(connect.reload())
		// 去掉调试
		
		// 压缩js
		if (!devMod) {
			page.pipe(debug())
			.pipe(uglify())
		}
		


		// 写入js文件到dist/js/
		page.pipe(gulp.dest(folder.dist + 'js/'))

})
gulp.task("img", function () {
	// 读取所有的img文件
	gulp.src(folder.src + 'img/*')
		// 变成文件流放入管道,压缩img文件
		.pipe(imagemin())
		// 写入img文件到dist/img/
		.pipe(gulp.dest(folder.dist + 'img/'))

})
// 开启服务器
gulp.task("server", function () {
	connect.server({
		port: "8888",
		livereload: true,
		open: true
	})
})
// 开启监听
gulp.task("watch", function () {
	gulp.watch(folder.src + "html/*", ["html"]);
	gulp.watch(folder.src + "css/*", ["css"]);
	gulp.watch(folder.src + "js/*", ["js"]);
})
// 默认任务
gulp.task("default", ["html", "css", "js", "img", "server", "watch"])