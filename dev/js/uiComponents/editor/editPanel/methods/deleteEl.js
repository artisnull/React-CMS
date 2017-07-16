/*
Filename: deleteEl.js
Author: Zach Lambert
Last Updated: 17 Apr 2017
Description: Deletes the active element
 */

export const	deleteEl = function() {
	// Remove the active classes and remove the active elem from collection

		let el = this.props.activeElement;

		this.unsetActive(el);
		this.props.resetActive();
		this.props.removeFromCollection(el);
	}

export default deleteEl;
