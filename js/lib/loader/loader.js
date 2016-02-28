( function( lib, config, controllers, views, templating ) {

	lib.fullScreenLoader = function( element, config ) {
		var _self = this;

		_self.config = config;

		if( element ) {
			_self.loaderView = element;
		} else {
		_self.loaderView = document.querySelector( _self.config.selector );
		}

	};

	lib.fullScreenLoader.prototype = {

		show: function() {
			var _self = this;

			_self.loaderView.classList.add( _self.config.showHideClass );

		},
		hide: function() {
			var _self = this;

			_self.loaderView.classList.remove( _self.config.showHideClass );
		},
		toggle: function() {
			var _self = this;

			_self.loaderView.classList.toggle( _self.config.showHideClass );
		},
		getViewState: function() {
			var _self = this;
			return _self.loaderView.classList.contains( _self.config.showHideClass );
		}


	};

} )( application.library, application.config, application.controller, application.views, Mustache );