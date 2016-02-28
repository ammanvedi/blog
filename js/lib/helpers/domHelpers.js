( function( lib ) {

	lib.appendDomString = function( element, string ) {

		var temp = document.createElement( 'div' );
		temp.innerHTML = string;

		var children = temp.children.length;

		for( var t = 0; t < children; t++ ) {
			element.appendChild( temp.children[ 0 ] );
		}

		return element;
	}


} )( application.library );
