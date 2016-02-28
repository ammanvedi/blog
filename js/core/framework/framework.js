
( function( fwk ) {

	/**
	 * since we want to have nice things like systems to manage
	 * our various view and our overall application state + want to
	 * do this with minimum involvment, we define an init function
	 * that should be called within the page init function
	 *
	 * this way we can be sure that we have all the appropriate
	 * framework functions ready
	 */
	fwk.initialise = function() {

		//create the viewSargent to manage the views in the application
		fwk.sargent = new fwk.viewSargent();
	}

} )( application.framework );