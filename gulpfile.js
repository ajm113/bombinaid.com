'use strict';

const   gulp = require('gulp'),
        pug = require('gulp-pug'),
        sourcemaps = require('gulp-sourcemaps'),
        browserify = require('browserify'),
        source = require('vinyl-source-stream'),
        buffer = require('vinyl-buffer'),
        babelify = require('babelify'),
        uglify = require('gulp-uglify'),
        rollupify = require('rollupify');

/*
    Compile our pug file into compiled HTML
*/
gulp.task('html', () =>  {
    return gulp.src('./client/pug/*.pug')
        .pipe(highland())
        .pipe(pug())
        .pipe(gulp.dest('./priv'));
});


gulp.task('js', () => {

    const browserifyEntry = ( entry ) => {
        return browserify({ entries: [entry.path], debug: true })
            .transform(babelify, { presets: ['es2015'], sourceMaps: isDebug })
            .transform(rollupify)
            .bundle()
            .on('error', (err) => { console.log(err.toString()); done(err); })
            .pipe(source(entry.path))
            .pipe(buffer())
            .pipe(highland());
    };

    return gulp.src('client/js')
    .pipe(highland())
    .flatMap(browserifyEntry)
    .tap(file => {
        file.path = file.path.replace('client/', '');
    })
    .through(sourcemaps.init({ loadMaps: true }))
    .through(uglify())
    .through(sourcemaps.write('./'))
    .pipe(gulp.dest('./priv/js'));
});

gulp.task('watch', ()=> {
    gulp.watch(['./client/js/**/*.{js,jsx}'], ['js']);
    gulp.watch(['./client/pug/*.pug'], ['html']);

});

gulp.task('default', () => {
    gulp.start('js', 'html');
});
