var ws = require( "gulp-webserver" );
var concat = require( "gulp-concat" );
var gulp = require( "gulp" );
var include = require( "gulp-file-include" );
var foreach = require('gulp-foreach');
var mod = require('gulp-modify');
var clean = require('gulp-clean');
var rs = require('run-sequence');
var watch = require('gulp-watch');
var batch = require('gulp-batch');
var uglify = require('gulp-uglify');

/**
 * The application build configuration, here we keep information that
 * may change, and if it did would cause us pain in the behind when changing
 * destination directories, constants, really any repeated strings that
 * are linked to our OS or implementation choice
 */
var applicationSettings = {
	templateExtension: "mst",
	templateAppExtension: "application.views",
	directories : {
		source: {
			script: ["./js/"],
			style: [ "./css" ],
			partial: [ "views/html-partial/**/*.html" ],
			img: [ "./img/**/*.png" ]
		},
		dist : {
			script: "./dist/js",
			style: "./dist/style",
			partial: "./dist/partial/",
			dist: "./dist",
			img:"./dist/img/"
		}
	}
};

/**
 * configuration for file includes in html
 *
 * example @@include( "anotherview.html" )
 */
var includeConfig = {
	prefix: '@@',
	basepath: './views/'
};

/**
 * configuration for gulp web server, as part of show and tell task
 * further options for this can be found in the gulp-webserver
 * documentation
 */
var wsConfig = {
	livereload: false,
	path: "/",
	directoryListing: true,
	open: true
};

/**
 * concat the js, here we are building the core definitions,
 * followed by the templates. We then append all other files
 * and finally the init Page script.
 *
 * this way we can have a clear entry point into the application and
 * have to worry not very much about if-defs or unknown core application
 * variables
 */
gulp.task( "js", [ "mashTemplates" ], function() {

	return gulp.src( [ applicationSettings.directories.source.script + "core/coreDefs.js",
						applicationSettings.directories.source.script + "core/**/!(coreDefs)*.js",
						applicationSettings.directories.source.script + "concat.tmpl.js",
						applicationSettings.directories.source.script + "!(main)/**/!(initPage)*.js",
						applicationSettings.directories.source.script + "main/initPage.js" ] )
		.pipe( concat( "appPack.js" ) )
		.pipe( gulp.dest( applicationSettings.directories.dist.script ) );
} );

/**
 * cs is simply concatenated, which allows us to at least be a
 * bit more modular with it, rather than having one 800 line css file
 */
gulp.task( "css", function() {

	return gulp.src( [ applicationSettings.directories.source.style + "/**/*.css" ] )
		.pipe( concat( "styles.css" ) )
		.pipe( gulp.dest( applicationSettings.directories.dist.style ) );
} );

/**
 * TEMPLATING 101
 *
 * templating is probably the most interesting task here. You may notice in th
 * js/core/coreDefs.js file that we define application.views, this is a standard
 * place where we can keep all the templates that the app will need client side
 *
 * templates are kept in views/app-views and its sub directories. We use the filename
 * as the key when the template is placed in the app.templates hash, in this respect
 * it is better if we keep to simple lower case names and make sure we do not duplicate
 *
 * double quoting is prevalent in html, and we wrap the templates in single quotes so
 * we can keep this standard when writing html, be aware that writing any single quotes
 * in the templates will likely break the build.
 *
 * templates are combined into a concat.tmpl.js file, after being wrapped into a js
 * member expression assignment, they are then placed in the root of the js/ directory
 * the js task will then take responsibility for packaging this with the source in the
 * appropriate order and will also clean up the concat.tmpl.js file
 *
 */
gulp.task( 'mashTemplates', function() {
	return gulp.src( './views/**/*.' + applicationSettings.templateExtension )
		.pipe( foreach( function( stream, file ) {

			var path = file.path.split( "/" );
			var name = path[ path.length - 1 ];
			return stream.pipe( mod( {
				fileModifier: function( file, contents ) {
					return  applicationSettings.templateAppExtension + "." + name.split( "." )[ 0 ] + "=" + "\'" + contents + "\';";
				}
			} ) );
		} ) )
		.pipe( uglify() )
		.pipe( concat( 'concat.tmpl.js' ) )
		.pipe( gulp.dest( applicationSettings.directories.source.script[ 0 ] ) )
} );

/**
 * banishf the concat.tmpl.js file after we are finished using it
 * as the user really has ne reason to interact with it
 */
gulp.task( 'cleanTemplates', function() {
	return gulp.src( './js/concat.tmpl.js' )
		.pipe( clean(  ) );
} );

/**
 * we need to place the index file in the root of the dist directory. so
 * we will build it separately from the other files and do this. We are also
 * passing it through the include task as we use this to modularise our HTML.
 */
gulp.task('index', function() {
	return gulp.src(['views/index.html'])
		.pipe(include( includeConfig ))
		.pipe(gulp.dest( applicationSettings.directories.dist.dist ));
});

/**
 * This task is basically the same as the index task however we are passing
 * through all the files in our partials directory
 */
gulp.task('partial', function() {
	return gulp.src( applicationSettings.directories.source.partial )
		.pipe(include( includeConfig ))
		.pipe(gulp.dest( applicationSettings.directories.dist.partial ));
});

/**
 * deploy a webserver using the configuration outlined in the wsConfig
 * allows us to quickly see our site once built without messing around with
 * apache / nginx / simpleservers ( still love you though simpleserver <3 )
 */
gulp.task( 'webserver', function() {
	gulp.src( "./" )
		.pipe(ws( wsConfig ));
});

gulp.task( 'img', function() {
	return gulp.src( applicationSettings.directories.source.img )
		.pipe( gulp.dest( applicationSettings.directories.dist.img ) );
});

/**
 * default task builds the application to the dist folder that is
 * specified in the applicationSettings object
 */
gulp.task( 'default', function(){

	rs( [ "js", "img", "css", "partial", "index"  ], 'cleanTemplates'  )

});

/**
 * task that can build the whole application as well as launch a web server and
 * display the project directories
 */
gulp.task( 'build:webserver', function() {

	rs( [ "js", "img", "css", "partial", "index"  ], 'cleanTemplates', 'webserver'  )

});

gulp.task('watch', function () {
	watch('js/**/*.js', batch(function (events, done) {
		gulp.start('default', done);
	}));

	watch('css/**/*.css', batch(function (events, done) {
		gulp.start('default', done);
	}));
});