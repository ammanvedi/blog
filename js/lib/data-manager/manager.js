( function( lib ) {

	var cache = {};

	var makeParams = function( params ) {

		var par = Object.keys( params );
		var parString = "";

		if( par.length ) {

			for( var d = 0; d < par.length; d++ ) {
				var prepend = d ? "&" : "?";
				parString += prepend + par[ d ] +  "=" + params[ par[ d ] ];
			}
		}

		return parString;


	};

	var get = function( cfg ) {

		var req = new XMLHttpRequest;

		var fullUrl = cfg.url + makeParams( cfg.params );


		if( cache[ fullUrl ] ) {
			cfg.callback.call( cfg.context, cache[ fullUrl ] );
			return;
		}

		req.open( "GET", fullUrl, true );
		req.onreadystatechange = function() {

			if( req.readyState === 4 ) {

				if( cfg.cache ) {
					cache[ fullUrl ] = req.response
				}

				cfg.callback.call( cfg.context, JSON.parse( req.response ) );
			}

		};

		req.send();

	};

	lib.data = {};

	lib.data.get = function( cfg ) {

		get( cfg );

	}

} )( application.library );