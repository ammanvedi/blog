/**
 * a definition of an application core, prevent polluting global namespace by keeping everything
 * under a single application property
 * @typedef {object} appCore
 * @property {object} library
 * @property {object} controller
 * @property {object} views has that will keep application view templates
 */
window.application = {

	library: {},
	framework: {},
	controller: {},
	views: {},
	config: {}

};