var fs = require("fs")
var browserify = require('browserify')
var vueify = require('vueify');
var gulp = require('gulp');
var rename = require('gulp-rename');
var source = require('vinyl-source-stream');
var uglify = require('gulp-uglify');
var buffer = require('vinyl-buffer');
var sourcemaps = require('gulp-sourcemaps');
var babelify = require('babelify');
var replace = require('gulp-replace');
var json = require('comment-json');
var shelljs = require('shelljs/global');
var moduleName = 'vueApp';

var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

var apiType = 'serve';

// var sass        = require('gulp-sass');


var CONFIG = {
    src: './src',
    dist: './dist',
    distJs: './dist/bundle.js'
};
var apiConfigStr;
var apiConfig;
try {
    apiConfigStr = fs.readFileSync('./assets/api.json').toString();
    console.log(apiConfigStr);
    apiConfig = json.parse(apiConfigStr, null, true);
} catch (e) {
    console.log(new Error('parse api.json error'));
    apiConfig = {};
}
/**
 * bundle operation
 */
function bundle() {
    return browserify('./src/main.js')
        .transform(vueify)
        // 提取.vue 中的样式
        .plugin('vueify/plugins/extract-css', {
            out: 'dist/bundle.css' // can also be a WritableStream
        })
        .transform(babelify, {
            presets: [
                'es2015', //转换es6代码
                'stage-0', //指定转换es7代码的语法提案阶段
            ],
            plugins: [
                'transform-object-assign', //转换es6 Object.assign插件
                ['transform-es2015-classes', {
                    "loose": false
                }], //转换es6 class插件
                ['transform-es2015-modules-commonjs', {
                    "loose": false
                }] //转换es6 module插件
            ]
        })
        .bundle();
}


/**
 * watch change then do some task
 * 
 */
function watchChange() {
    gulp.watch('./src/*.js', ['devBuild']);
    gulp.watch('./src/components/*.vue', ['devBuild']);
    gulp.watch('./index.html', ['copy']);
    gulp.watch('./index.html').on('change', reload);
}


gulp.task('testBuild', function () {
    browserify('./src/main.js')
        .transform(vueify)
        .plugin('vueify/plugins/extract-css', {
            out: 'dist/bundle.css' // can also be a WritableStream
        })
        .transform(babelify, {
            presets: [
                'es2015', //转换es6代码
                'stage-0', //指定转换es7代码的语法提案阶段
            ],
            plugins: [
                'transform-object-assign', //转换es6 Object.assign插件
                ['transform-es2015-classes', {
                    "loose": false
                }], //转换es6 class插件
                ['transform-es2015-modules-commonjs', {
                    "loose": false
                }] //转换es6 module插件
            ]
        })
        .bundle()
        .pipe(source('js/bundle.js'))
        .pipe(buffer())
        .on('error', function (err) {
            console.log(err);
        })
        // .pipe(uglify())
        .on('error', function (err) {
            console.log(err);
        })
        .pipe(gulp.dest('./dist'));
});


gulp.task('js', function () {
    var b = bundle();
    b.pipe(source('js/bundle.js'))
        // .pipe(rename('js/bundle.js'))
        .pipe(gulp.dest('./dist'));
});


gulp.task('serve', ['copy', 'devBuild'], function () {
    browserSync.init({
        open: true, // 是否启动打开浏览器
        server: [
            './dist',
            './assets/data',
        ],
        notify: false,
    });
    watchChange();
    gulp.watch('./dist/**').on('change', reload);
});



gulp.task('devBuild', function () {
    var b = bundle();
    b.pipe(source('js/bundle.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({
            loadMaps: true
        }))
        .pipe(replace(/{{(.+Api)}}/g, function (match, apiName) {
           
            if (!apiConfig[apiName]) {
                console.log('Api replace error, apiName: "' + apiName + '", check your code and api.json');
                return '';
            }
            console.log(apiConfig);
            console.log(apiName+'->'+apiType);
            return apiConfig[apiName][apiType];
        }))
        .pipe(gulp.dest('./dist'));
});

gulp.task('dev', ['copy'], function () {
    var apiType = 'dev';
    var b = bundle();
    b.pipe(source('js/bundle.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({
            loadMaps: true
        }))
        .pipe(replace(/{{(.+Api)}}/g, function (match, apiName) {
            if (!apiConfig[apiName]) {
                console.log('Api replace error, apiName: "' + apiName + '", check your code and api.json');
                return '';
            }
            return apiConfig[apiName][apiType];
        }))
        .pipe(gulp.dest('./dist'));
});

gulp.task('test', function () {

});

gulp.task('beta', function () {

});


gulp.task('prod', function () {
    apiType = 'prod';
    var b = bundle();
    b.pipe(source('js/bundle.js'))
        .pipe(buffer())
        // uglify 之前必须要用buffer，gulp-uglify只支持Buffer类型的Vinyl File Object
        .pipe(uglify())
        .pipe(replace(/{{(.+Api)}}/g, function (match, apiName) {
            console.log(apiName);
            console.log(apiConfig);
            if (!apiConfig[apiName]) {
                console.log('Api replace error, apiName: "' + apiName + '", check your code and api.json');
                return '';
            }
            return apiConfig[apiName][apiType];
        }))
        .pipe(gulp.dest('./dist'));
});


/**
 * copy html 
 */
gulp.task('copy', function () {
    gulp.src('./*.html')
        .pipe(gulp.dest('./dist'));
});

gulp.task('default', ['serve']);

gulp.task('tar', function () {
    exec('cd dist; zip -r  ' + moduleName + '.zip ./');
})