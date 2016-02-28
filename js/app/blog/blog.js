
( function( fwk, lib, config, controllers, templating ) {


	var getArticle = function( _self, page ) {

		var p = {
			key: config.BLOGGER_API_KEY,
			orderBy: "published",
			maxResults: 1,
			status: "live"
		};

		if( page ) {
			p.pageToken = page;
		}

		lib.data.get( {
			url: "https://www.googleapis.com/blogger/v3/blogs/" + config.BLOGGER_BLOG_ID + "/posts",
			context: _self,
			callback: _self.gotArticleData,
			params: p
		} )
	};

	var getBlogInfo = function( _self ) {


		lib.data.get( {
			url: "https://www.googleapis.com/blogger/v3/blogs/" + config.BLOGGER_BLOG_ID,
			context: _self,
			callback: _self.gotBlogInfo,
			params: {
				key: config.BLOGGER_API_KEY
			}
		} )
	};

	var render = function( _self, data, container ) {

		//_self.hero = new controllers.hero( container, data );

	};

	var renderArticle = function( _self, data, container ) {

		var cfg = {
			renderCallback: {
				ctx: _self,
				fn: function() {
					//hide the loader and show the view
					controllers.loader.hide();
					_self.show();
				}
			}
		};

		_self.articles.push( new controllers.article( container, data, cfg ) );

	};


	controllers.blog = function( cfg ) {
		var _self = this;

		_self.super( cfg );

		_self.container = _self.viewEl;
		_self.page = false;
		_self.articles = [];
		_self.attach();

		getBlogInfo( _self );
		getArticle( _self, _self.page );

	};

	/**
	 * our blog is an extended application view, lets allow it to be
	 * managed by the view sargent / get some useful utility methods
	 * by extending the view class
	 */
	controllers.blog.prototype = Object.create( fwk.view.prototype );
	controllers.blog.prototype.super = fwk.view;

	controllers.blog.prototype.gotBlogInfo  = function( data ) {
		var _self = this;
		console.log( data );

		render( _self, data, _self.container );
	};

	controllers.blog.prototype.gotArticleData  = function( data ) {
		var _self = this;

		if( data.nextPageToken ) {
			_self.page = data.nextPageToken;
		}

		renderArticle( _self, data, _self.container );
	};

	// https://www.googleapis.com/blogger/v3/blogs/2399953?key=AIzaSyBAHkl2BBO1uNUL39vlf1MzUyEhC6bvysE




} )( application.framework, application.library, application.config, application.controller, Mustache );