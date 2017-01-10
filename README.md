# vue2
vue2 spa demo

## usage
- npm i 
- gulp 
- gulp dev/test/beta/prod

> 
Vinyl File Object的contents可以有三种类型：Stream、Buffer（二进制数据）、Null（就是JavaScript里的null）。需要注意的是，各类Gulp插件虽然操作的都是Vinyl File Object，但可能会要求不同的类型。
gulp-uglify这种需要对JavaScript代码做语法分析的，就必须保证代码的完整性，因此，gulp-uglify只支持Buffer类型的Vinyl File Object。

> vinyl-source-stream可以把普通的Node Stream转换为Vinyl File Object Stream。这样，相当于就可以把普通Node Stream连接到Gulp体系内

> vinyl-buffer接收Vinyl File Object作为输入，然后判断其contents类型，如果是Stream就转换为Buffer。

很多常用的Gulp插件如gulp-sourcemaps、gulp-uglify，都只支持Buffer类型，因此vinyl-buffer可以在需要的时候派上用场。

## refrence
- [gulp stream](https://segmentfault.com/a/1190000003770541)
- [browserify](https://www.w3cplus.com/workflow/gulp-tutorial-5-javascripts-browserify.html)
- [NODE_ENV production 减小包体积](http://stackoverflow.com/questions/28939762/removing-process-env-node-env-with-browserify-envify)

