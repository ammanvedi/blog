( function( fwk, lib, cfg, controllers ) {


	/**
	 * create a view with a configuration as follows
	 * @typedef {object} viewConfiguration
	 * @property {HTMLElement} element create a existing DOM el ( takes precedence )
	 * @property {string} name give the view a human friendly name for reference
	 */


	/**
	 * here we are defining a construct to represent a view of our application
	 * we could get really abstract here to the point where each individual div
	 * could be considered a view. but lets not...
	 *
	 * a view in the context is a div/HTMLElement that takes up the entirety of the
	 * screen. within this we render our interface.
	 *
	 * this class provides utility methods for creating a view dynamically or from an
	 * existing element, and accessing utility methods and state
	 *
	 * create with new application.framework.view ( cfg ), applications view, if
	 * no element is specified a new one will be created and returned, but will
	 * not be shown until, you explicitly call the 'attach' method
	 *
	 * @param config
	 */
	fwk.view = function( config ) {
		var _self = this;

		_self.config = config;
		_self.attached = _self.config.element ? true : false;
		_self.name = config.name;

		if( _self.config.element ) {
			_self.viewEl = _self.config.element;
		} else {

			// lets create a dom element instead then
			_self.viewEl = document.createElement( 'div' );
		}

		_self.viewEl.setAttribute( "id", config.name );

		_self.hide();

		fwk.sargent.addView( _self );

	};

	fwk.view.prototype.hide = function() {
		var _self = this;

		_self.viewEl.classList.add( "hidden" );

	};

	fwk.view.prototype.show = function() {
		var _self = this;

		_self.viewEl.classList.remove( "hidden" );

	};

	/**
	 * get the view element that this view will render
	 * @returns {HTMLElement}
	 */
	fwk.view.prototype.getElement = function() {
		var _self = this;

		return _self.viewEl;

	};

	/**
	 * manually set the state of the attached property
	 *
	 * @param {boolean} state true = attached || false = unattached
	 */
	fwk.view.prototype.setAttached = function( state ) {
		var _self = this;

		_self.attached = state;
	};

	/**
	 * get the name of the view
	 * @returns {string}
	 */
	fwk.view.prototype.getName = function() {
		var _self = this;

		return _self.name;

	};

	/**
	 * get the state of weather the view is in the dom
	 * @returns {boolean} weather view has been attached already
	 */
	fwk.view.prototype.isAttached = function() {
		var _self = this;

		return _self.attached;

	};

	/**
	 * add the view to the root view context ( usually body ) that is
	 * defined by the view sargent
	 */
	fwk.view.prototype.attach = function() {
		var _self = this;

		fwk.sargent.attachView( _self );

	};



} )( application.framework, application.library, application.config, application.controller );