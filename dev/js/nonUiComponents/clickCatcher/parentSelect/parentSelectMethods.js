/*
Filename: parentSelectMethods.js
Author: Zach Lambert
Last Updated: 17 Apr 2017
Description: Methods to add handlers and update props to select parent when
creating new element
 */

export const addHoverHandler = function() {
	// When starting parentSelect, add handler, ensure editpanel is closed

	document.addEventListener('mouseover', this.identifyParent)
	this.unsetActive(this.props.activeElement);
	this.props.resetActive();
}

export const removeHoverHandler = function() {
	// Removes hover handler
	document.removeEventListener('mouseover', this.identifyParent)
}

export const identifyParent = function(e) {
// Called from hover handler when user is selecting a parent for
// their new component
	let el;

	// Handler gives this function an event, but we give it a dom element
	if (e.clientX != null) {
		el = (e.toElement == undefined)? e.target : e.toElement;
	} else {
		el = e;
	}

	// Toggle active on click of same element
	if ((el.id === this.props.activeParent.id) && (el.id != '')) {
		return;
	}

	// Only allow section and page to be parents
	// Go to parent if current node is not section or page

	if ((!el.classList.contains('page')) && (!el.classList.contains('editor')) && (!el.classList.contains('section'))) {
		// Move up a node
		return this.identifyParent(el.parentNode)
	}
	// Any element that has a class of 'editor' cannot be made active
	if ((el.classList.contains('editor'))) {
		return;
	}

	// Unset the previous active element
	this.unhighlightParent(this.props.activeParent);

	// Set the new element as active
	this.highlightParent(el);

}

export const highlightParent = function(el) {
	// Add hover class, add id to props
	el.classList.add('hoverOn')
	this.props.selectNewParent(el);
}

export const unhighlightParent = function(el) {

	// Remove the active class from the element
	if (el.id === '') {
		return
	}
	el = document.getElementById(el.id);
	el.classList.remove('hoverOn');
}

export const confirmParent = function() {
	// Remove ui hints, stop parentSelect mode
	//
	this.unhighlightParent(this.props.activeParent);
	this.removeHoverHandler();
	this.props.disableParentSelect();
	document.getElementById('creatorPanel').classList.remove('seethru');
}
