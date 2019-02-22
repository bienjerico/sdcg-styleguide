var gulp = require("gulp"),
    sass = require("gulp-sass"),
    postcss = require("gulp-postcss"),
    autoprefixer = require("autoprefixer"),
    cssnano = require("cssnano"),
    sourcemaps = require("gulp-sourcemaps"),
    concat = require('gulp-concat'),
    minify = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    ngAnnotate = require('gulp-ng-annotate'),
    plumber = require('gulp-plumber'),
    bytediff = require('gulp-bytediff'),
    del = require('del'),
    browserSync = require("browser-sync").create();

// Put this after including our dependencies
var paths = {
    styles: {
        // By using styles/**/*.sass we're telling gulp to check all folders for any sass file
        src: ['node_modules/bootstrap/scss/bootstrap.scss'
            //,'node_modules/@fortawesome/fontawesome-free/scss/fontawesome.scss'
            , 'src/scss/*.scss'],
        // Compiled files will end up in whichever folder it's found in (partials are not compiled)
        dest: "src/css/"
    },
    scripts:{
        src:[
           
            'node_modules/jquery/dist/jquery.js'
            ,'node_modules/popper.js/dist/umd/popper.js'
            ,'node_modules/bootstrap/dist/js/bootstrap.js'
            ,'node_modules/angular/angular.js'
            ,'node_modules/angular-route/angular-route.js'
            ,'src/Pages/**/*.js'
            ,'src/js/scripts.js'
        ],
        dest: "src/js/",
    }

};

// Define tasks after requiring dependencies
function style() {
    // Where should gulp look for the sass files?
    // My .sass files are stored in the styles folder
    // (If you want to use scss files, simply look for *.scss files instead)
    return (
        gulp
            .src(paths.styles.src)
            // Initialize sourcemaps before compilation starts
            .pipe(sourcemaps.init())
            // Use sass with the files found, and log any errors
            .pipe(sass())
            .on("error", sass.logError)
            // concatenate the file into 1 file
            .pipe(concat('styles.min.css'))
            // minify the css style
            .pipe(minify())
            // Use postcss with autoprefixer and compress the compiled file using cssnano
            .pipe(postcss([autoprefixer(), cssnano()]))
            // What is the destination for the compiled file?
            .pipe(gulp.dest(paths.styles.dest))
            // Add browsersync stream pipe after compilation
            .pipe(browserSync.stream())
    );
}

function script(){
    return (
        gulp
            .src(paths.scripts.src)
            // Initialize sourcemaps before compilation starts
            .pipe(sourcemaps.init())

            .pipe(plumber())

            .pipe(concat('app.js', {newLine: ';'}))

            .pipe(ngAnnotate({
                // true helps add where @ngInject is not used. It infers.
                // Doesn't work with resolve, so we must be explicit there
                add: true
            }))
            //Creates a new property on the file object that saves its current size.
            .pipe(bytediff.start())
            // uglify
            //.pipe(uglify({mangle: true}))
            //Outputs the difference between the property saved with the start() method and the current filesize.
            .pipe(bytediff.stop())
            //
	         .pipe(plumber.stop())
            // What is the destination for the compiled file?
            .pipe(gulp.dest(paths.scripts.dest))
            // Add browsersync stream pipe after compilation
            .pipe(browserSync.stream())
    )
}


function clean(){
    return(
        del(['src/js/app.min.js','src/js/app.js'])
    )
}
function scriptMin(){
    return (
        gulp
            .src(paths.scripts.src)
            // Initialize sourcemaps before compilation starts
            .pipe(sourcemaps.init())

            .pipe(plumber())

            .pipe(concat('app.min.js', {newLine: ';'}))

            .pipe(ngAnnotate({
                // true helps add where @ngInject is not used. It infers.
                // Doesn't work with resolve, so we must be explicit there
                add: true
            }))
            //Creates a new property on the file object that saves its current size.
            .pipe(bytediff.start())
            // uglify
            .pipe(uglify({mangle: true}))
            //Outputs the difference between the property saved with the start() method and the current filesize.
            .pipe(bytediff.stop())
            //
	         .pipe(plumber.stop())
            // What is the destination for the compiled file?
            .pipe(gulp.dest(paths.scripts.dest))
            // Add browsersync stream pipe after compilation
            .pipe(browserSync.stream())
    )
}

	
function watch(){
    browserSync.init({
        // You can tell browserSync to use this directory and serve it as a mini-server
        server: {
            baseDir: "D:/Web/Bootstrap-4/sdcg-styleguide/src/"
        }
        // If you are already serving your website locally using something like apache
        // You can use the proxy setting to proxy that instead
        // proxy: "yourlocal.dev"
    });
    // gulp.watch takes in the location of the files to watch for changes
    // and the name of the function we want to run on change
    gulp.watch(paths.styles.src, style)
    gulp.watch(paths.scripts.src, script)
    gulp.watch(paths.scripts.src, scriptMin)

    // We should tell gulp which files to watch to trigger the reload
    // This can be html or whatever you're using to develop your website
    // Note -- you can obviously add the path to the Paths object
    gulp.watch("*.html", reload);
}

	
// A simple task to reload the page
function reload() {
    browserSync.reload();
}
 

 
// Don't forget to expose the task!
exports.watch = watch
exports.clean = clean