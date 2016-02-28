( function( fwk ) {

	/**
	 * @namespace fwk.viewSargent.private
	 */

	var applicationViews = [];

	/**
	 * The view sargent will keep a global record of the views in
	 * in the app, and make sure that they are all behaving
	 * and are in ship shape!
	 *
	 * The sargent is not all powerful though! Everyone has a boss, even
	 * Darth Vader had Palpatine; the sargent manages views under a root
	 * view scope, provided as a html element to the constructor
	 */
	fwk.viewSargent = function( rootView ) {
		var _self = this;

		_self.viewContext = rootView || document.querySelector( 'body' );

	};

	/**
	 * add a view to the local representation/array
	 *
	 * @param {application.framework.view} view to add
	 */
	fwk.viewSargent.prototype.addView = function( view ) {
		var _self = this;

		applicationViews.push( view );
	};

	/**
	 * actually push the view into the dom so it is visible
	 *
	 * @param {application.framework.view} view to attach
	 */
	fwk.viewSargent.prototype.attachView = function( view ) {
		var _self = this;

		if( !view.isAttached() ) {
			_self.viewContext.appendChild( view.getElement() );
			view.setAttached( true );
		}
	};

	/**
	 * get a view based on name, this makes the simple assumption that views
	 * have been named uniquely.
	 *
	 * @param {string} name the name of the view to retrieve
	 * @returns {application.framework.view} found view
	 */
	fwk.viewSargent.prototype.getView = function( name ) {
		var _self = this;

		return applicationViews.filter( function( view ) {

			return view.getName() === name;

		} )[ 0 ];

	};

} )( application.framework );