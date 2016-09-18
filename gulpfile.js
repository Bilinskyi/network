'use strict';

var gulp = require('gulp'),
sass = require('gulp-sass'),
rename = require('gulp-rename'),
sftp = require('gulp-sftp'),
concat       = require('gulp-concat'),
jsmin = require('gulp-jsmin'),
browserSync = require('browser-sync').create(),
imageop = require('gulp-image-optimization'),
del         = require('del'), // Подключаем библиотеку для удаления файлов и папок
autoprefixer = require('gulp-autoprefixer');

gulp.task('browserSync', function() {
	browserSync.init({
		server: {
			baseDir: 'app'
		},
	})
})


gulp.task('images', function(cb) {
	gulp.src(['app/img/**/*.png','app/img/**/*.jpg','app/img/**/*.gif','app/img/**/*.jpeg']).pipe(imageop({
		optimizationLevel: 5,
		progressive: true,
		interlaced: true
	})).pipe(gulp.dest('dist/img')).on('end', cb).on('error', cb);
});


gulp.task('sass', function () {
	return gulp.src('app/sass/**/*.scss')
	.pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
	.pipe(autoprefixer(['last 15 versions'], { cascade: true }))
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.reload({
		stream: true
	}));
});



gulp.task('scripts', function() {
		return gulp.src([ // Берем все необходимые библиотеки
			'app/js/**/*.js',
				'!app/js/**/main.js' // Берем jQuery
				])
				.pipe(concat('libs.min.js')) // Собираем их в кучу в новом файле libs.min.js
				.pipe(jsmin()) // Сжимаем JS файл
				.pipe(gulp.dest('dist/js')); // Выгружаем в папку app/js
			});


gulp.task('clean', function() {
		return del.sync('dist'); // Удаляем папку dist перед сборкой
	});

gulp.task('build', ['clean', 'images', 'sass', 'scripts' ], function() {

		var buildCss = gulp.src([ // Переносим библиотеки в продакшен
			'app/css/*.css'
			])
		.pipe(gulp.dest('dist/css'))

		var buildFonts = gulp.src('app/fonts/**/*') // Переносим шрифты в продакшен
		.pipe(gulp.dest('dist/fonts'))

		var buildBxslider = gulp.src('app/bx-slider/**/*') // Переносим шрифты в продакшен
		.pipe(gulp.dest('dist/bx-slider'))

		var buildFancybox = gulp.src('app/fancybox/**/*') // Переносим шрифты в продакшен
		.pipe(gulp.dest('dist/fancybox'))

		var buildOWL = gulp.src('app/owl-carousel/**/*') // Переносим шрифты в продакшен
		.pipe(gulp.dest('dist/owl-carousel'))

		var buildSendmail = gulp.src('app/sendmail.php') // Переносим шрифты в продакшен
		.pipe(gulp.dest('dist'))

		var buildJs = gulp.src([
			'app/js/main.js'
		]) // Переносим скрипты в продакшен
		.pipe(gulp.dest('dist/js'))

		var buildHtml = gulp.src('app/*.html') // Переносим HTML в продакшен
		.pipe(gulp.dest('dist'));

	});






gulp.task('watch', ['sass', 'browserSync'], function () {
	gulp.watch('app/sass/**/*.scss', ['sass']);
// Reloads the browser whenever HTML or JS files change
gulp.watch('app/*.html', browserSync.reload); 
gulp.watch('app/js/**/*.js', browserSync.reload);
});
