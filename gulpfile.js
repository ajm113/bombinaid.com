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
        autoprefixer = require('gulp-autoprefixer'),
        sass = require('gulp-sass'),
        del = require('del'),
        os = require('os'),
        config =require('./gulp.config.js');

const NOTIFICATION_TITLE = 'Bombinaid Task Manager';

var server = null;


/*
    Compile our pug file into compiled HTML
*/
gulp.task('html', () =>  {
    return gulp.src(config.pug.input)
        .pipe(highland())
        .through(pug())
        .through(gulp.dest(config.pug.output))
        .pipe(livereload());
});


gulp.task('js', () => {
    const browserifyEntry = ( entry ) => {

        return browserify({ entries: [entry.path], debug: true })
            .transform(babelify, config.babel.options)
            .transform(rollupify)
            .bundle()
            .on('error', (err) => {
                console.log(err.toString());
                notifier.notify({
                    'title': NOTIFICATION_TITLE,
                    'message': err.toString()
                });
                done(err);
            })
            .pipe(source(entry.path))
            .pipe(buffer())
            .pipe(highland())
    };

    return gulp.src(config.js.input)
    .pipe(highland())
    .flatMap(browserifyEntry)
    .tap(file => {
        let newFilepath = file.path.replace('client/js/', '');
        file.path = newFilepath.replace('.jsx', '.js');
    })
    .through(sourcemaps.init({ loadMaps: true }))
    .through(uglify())
    .through(sourcemaps.write('./'))
    .pipe(gulp.dest(config.js.output))
    .pipe(livereload());
});

gulp.task('scss', ()=> {
    return gulp.src(config.scss.input)
    .pipe(sourcemaps.init())
    .pipe(sass(config.scss.options).on('error', sass.logError))
    .pipe(autoprefixer(config.autoprefixer.options))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(config.scss.output));
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
            'title': NOTIFICATION_TITLE,
            'message': lines
        });
    }

    // Display terminal informations
    server.stderr.on('data', function(data) {

        notifier.notify({
            'title': NOTIFICATION_TITLE,
            'message': data.toString()
        });

        process.stdout.write(data.toString());
    });
    // Display terminal informations
    server.stdout.on('data', function(data) {
        process.stdout.write(data.toString());
    });
});

gulp.task('clean', () => {
  return del([config.del.input]).then(paths => {
      console.log('Deleted files and folders:\n', paths.join('\n'));
  });
});

gulp.task('watch:erlang', () => {
    gulp.watch(config.erlang.input, ['serve']);
});

gulp.task('watch', ()=> {
    gulp.watch([config.js.input], ['js']);
    gulp.watch([config.pug.input], ['html']);
    gulp.watch([config.scss.input], ['scss']);

});

gulp.task('default', () => {
    gulp.start('html', 'js', 'scss');
});


gulp.task('dev', () => {

    notifier.notify({
        'title':  NOTIFICATION_TITLE,
        'message': 'Starting dev server...'
    });

    gulp.start(sync(['html', 'js', 'scss', 'watch', 'watch:erlang', 'serve']));
});
