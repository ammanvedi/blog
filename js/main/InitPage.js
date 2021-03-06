/**
 * todo - get a blog id from the url + update the currently reading post and update the url
 * todo - provide a home link
 * todo - decide weather to display article on load and load one more at a time, or load say 5 and show headers with options to read for each, then retrieve article text on request
 * todo - create new small loader icon / partial
 * todo - write readme
 * todo - compress images in build
 * todo - auto load new article with scroll loader
 * todo - decide weather a post list could work and if so how ( needs to be minimal  )
 */


( function( fwk, lib, config, controllers ) {

	document.addEventListener("DOMContentLoaded", function() {

		fwk.initialise();

		controllers.loader = new lib.fullScreenLoader( false, {
			selector: ".fullScreenModal",
			showHideClass: "modalActive"
		} );

		new controllers.blog( {
			name: "maincontent"
		} );
	});



} )( application.framework, application.library, application.config, application.controller );
