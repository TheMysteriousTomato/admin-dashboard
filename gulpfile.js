var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();

/**
 * Gulp Task: sass
 *
 * compiles any .scss or .sass file inside the app/scss folder
 * outputs the .css files into app/css
 *
 */
gulp.task('sass', function() {
  // *.scss any pattern ending with .scss in the root folder
  // **/*.scss any file ending with .scss in the root folder and any child directories
  // !not-me.scss exclude
  // *.+(scss|sass) matches multiple patterns, includes .scss or .sass
  return gulp.src('app/scss/**/*.scss') // source
    .pipe(sass()) // using gulp-sass
    .pipe(gulp.dest('app/css')) // destination
    .pipe(browserSync.stream());
});

/**
 * Gulp Task: watch
 *
 * watches the files inside app/scss for any changes
 * if there are run the sass task, to compile them
 */

gulp.task('watch', ['serve'], function() { // second parameter can be an array of tasks to complete before watch
  // gulp.watch('files-to-watch', ['tasks', 'to', 'run']);

  // compile css files first
  gulp.watch('app/scss/**/*.scss', ['sass']);

  // Reloads the browser whenever HTML or JS files change
  gulp.watch('app/**/*.html', browserSync.reload);
  gulp.watch('app/**/*.js', browserSync.reload);
});

/**
 * Gulp Task: browser-sync
 */
 gulp.task('serve', function() {
   browserSync.init({
     server: {
       baseDir: 'app'
     },
   })
 });

 /**
  * Gulp Task: useref
  *
  * Concatenates JS and CSS files
  *
  */
  var useref = require('gulp-useref');
  // minify plugin for js
  var uglify = require('gulp-uglify');
  // minify plugin for css
  var cssnano = require('gulp-cssnano');
  var gulpIf = require('gulp-if');

  gulp.task('useref', function() {
    return gulp.src('app/*.html')
      .pipe(useref())
      // minify js files
      .pipe(gulpIf('*.js', uglify()))
      .pipe(gulpIf('*.css', cssnano()))
      .pipe(gulp.dest('dist'))
  });

  /**
   * Gulp Task: images
   *
   * Optimizes images
   */
   var imagemin = require('gulp-imagemin');
   var cache = require('gulp-cache');

   gulp.task('images', function() {
     return(gulp.src('app/images/**/*.+(png|jpg|gif|svg)'))
     .pipe(cache(imagemin({
       interlaced: true
     })))
     .pipe(gulp.dest('dist/images'))
   });

   /**
    * Gulp Task: fonts
    *
    * Copy fonts over to dist folder
    */
    gulp.task('fonts', function() {
      return (gulp.src('app/fonts/**/*'))
        .pipe(gulp.dest('dist/fonts'))
    });

    /**
     * Gulp Task: clean:dist
     *
     * Removes generated files after we're done
     */
     var del = require('del');
     gulp.task('clean:dist', function() {
       return del.sync('dist');
     });

     /**
      * Gulp Task: build
      */
      var runSequence = require('run-sequence');
      gulp.task('build', function(callback) {
        runSequence('clean:dist',
          ['sass', 'useref', 'images', 'fonts'],
          callback
        )
      });

      /**
       * Gulp Task: default
       */
       gulp.task('default', function (callback) {
         runSequence(
           ['sass', 'serve', 'watch'],
           callback
         )
       });
