import { task, src, dest, watch, series } from 'gulp';
const sass = require('gulp-sass')(require('sass'));
import { init, write } from 'gulp-sourcemaps';

task('sass', function(){
    return src('./sass/**/*.sass')
    .pipe(init())
    .pipe(sass({}).on('error', sass.logError))
    .pipe(write())
    .pipe(dest('./css'));
});

task('watch', function(){
    watch('./sass/**/*.sass', series('sass'));
});

task('default', series('sass', 'watch'));