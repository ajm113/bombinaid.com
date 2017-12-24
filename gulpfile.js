'use strict';

const   gulp = require('gulp'),
        pug = require('gulp-pug'),
        sourcemaps = require('gulp-sourcemaps'),
        browserify = require('browserify'),
        source = require('vinyl-source-stream'),
        buffer = require('vinyl-buffer'),
        babelify = require('babelify'),
        uglify = require('gulp-uglify'),
        highland = require('highland'),
        rollupify = require('rollupify'),
        util = require('gulp-util'),
        sync = require('gulp-sync')(gulp).sync,
        notifier = require('node-notifier'),
        livereload = require('gulp-livereload'),
        child = require('child_process'),
        del = require('del'),
        os = require('os');

var server = null;

/*
    Compile our pug file into compiled HTML
*/
gulp.task('html', () =>  {
    return gulp.src('./client/pug/*.pug')
        .pipe(highland())
        .through(pug())
        .through(gulp.dest('./priv'))
        .pipe(livereload());
});


gulp.task('js', () => {
    const browserifyEntry = ( entry ) => {

        return browserify({ entries: [entry.path], debug: true })
            .transform(babelify, { presets: ['es2015', 'preact'], sourceMaps: true })
            .transform(rollupify)
            .bundle()
            .on('error', (err) => {
                console.log(err.toString());
                notifier.notify({
                    'title': 'Error Building Babel',
                    'message': err.toString()
                });
                done(err);
            })
            .pipe(source(entry.path))
            .pipe(buffer())
            .pipe(highland())
    };

    return gulp.src('./client/js/app.jsx')
    .pipe(highland())
    .flatMap(browserifyEntry)
    .tap(file => {
        let newFilepath = file.path.replace('client/js/', '');
        file.path = newFilepath.replace('.jsx', '.js');
    })
    .through(sourcemaps.init({ loadMaps: true }))
    .through(uglify())
    .through(sourcemaps.write('./'))
    .pipe(gulp.dest('./priv/assets/js'))
    .pipe(livereload());
});

gulp.task('serve', () => {

    livereload.listen();

    if(server && server !== 'null') {
        server.kill();
    }

    server = child.spawn('rebar3', ['shell']);

    if(server.stderr.length) {
        util.log(util.colors.red('Something went wrong running server: '));
        let lines = server.stderr.toString()
            .split('\n').filter((line) => {
                return line.length;
            });
        for (let l in lines) {
            util.log(util.colors.red('Error: (rebar3 shell)' + lines[l]));
        }
        notifier.notify({
            'title': 'Error rebar shell',
            'message': lines
        });
    }

    // Display terminal informations
    server.stderr.on('data', function(data) {
        process.stdout.write(data.toString());
    });
    // Display terminal informations
    server.stdout.on('data', function(data) {
        process.stdout.write(data.toString());
    });
});

gulp.task('watch:erlang', () => {
    gulp.watch('./src/**/*.{erl,src}', ['serve']);
});

gulp.task('watch', ()=> {
    gulp.watch(['./client/js/**/*.{js,jsx}'], ['js']);
    gulp.watch(['./client/pug/**/*.pug'], ['html']);

});

gulp.task('default', () => {
    gulp.start('js', 'html');
});


gulp.task('dev', () => {
    gulp.start(sync(['html', 'js', 'watch', 'watch:erlang', 'serve']));
});
