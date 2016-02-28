( function( lib, config, controllers, views, templating ) {


	var renderArticle = function( _self, container, data, config ) {

		lib.appendDomString( container, templating.render( views.articleHero, data ) );
		lib.appendDomString( container, templating.render( views.article, data ) );

		if( config.renderCallback && config.renderCallback.fn ) {
			config.renderCallback.fn.call( config.renderCallback.ctx );
		}

	};




	controllers.article = function( container, articleData, config ) {
		var _self = this;

		_self.container = container;
		_self.config = config;

		renderArticle( _self, _self.container, articleData, _self.config );

	};

} )( application.library, application.config, application.controller, application.views, Mustache );