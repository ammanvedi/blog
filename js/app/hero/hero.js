( function( lib, config, controllers, views, templating ) {


	var renderHero = function( _self, container, data ) {

		container.innerHTML = templating.render( views.blogHero, data );

	};


	controllers.hero = function( container, data ) {
		var _self = this;

		if( data ) {
			renderHero( _self, container, data );
		}

	}




} )( application.library, application.config, application.controller, application.views, Mustache );