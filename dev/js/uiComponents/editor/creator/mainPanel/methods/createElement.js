/*
Filename: createElement.js
Author: Zach Lambert
Last Updated: 17 Apr 2017
Description: Method to finish creating element and add to collection
 */

import constructEl from '../../../../../methods/constructEl.js'
import buildClass from '../methods/buildClass.js'

const createElement = function() {
	// Construct plain obj from state, then construct object of correct type,
	// then add to collection

		let state = this.state;

		// All elements except page must have a parent
		if ((state.type.toLowerCase() !== 'page') && (state.parent.id === '')) {
			return console.warn('No Parent Specified');
		}

		// Build the className based on the type and selected options
		let cN = buildClass(state);

		// Pages don't get a parent, otherwise assign parent ID and type
		let par = (state.type.toLowerCase() === 'page') ? '' : {
			id: state.parent.id,
			type: state.parent.type
		};

		// Plain Object
		let obj = {
			type: state.type,
			name: state.name,
			parent: par,
			content: state.content,
			className: cN,
			url: state.url,
		};

		// Object of correct type
		let el = constructEl(obj);

		this.props.addToCollection(el);
		this.closeCreator();

	}
export default createElement;
