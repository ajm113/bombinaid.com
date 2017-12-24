module.exports = {
    pug: {
        input: "./client/pug/*.pug",
        output: "./priv",
    },
    js: {
        input: "./client/js/app.jsx",
        output: "./priv/assets/js/",
    },
    scss: {
        input: "./client/scss/**/*.scss",
        output: "./priv/assets/css/",
        options: {
            outputStyle: "compressed",
            includePaths: ['node_modules/']
        }
    },
    erlang: {
        input: "./src/**/*.{erl,src}"
    },
    del: {
            input: "./priv/assets"
    },
    autoprefixer: {
        options: {
            browsers: ['last 4 versions'],
            cascade: false
        }
    },
    babel: {
        options:{
            presets: ['es2015', 'preact'],
            sourceMaps: true
        }
    }
};
