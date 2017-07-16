/*
Filename: activeElementMethods.js
Author: Zach Lambert
Last Updated: 17 Apr 2017
Description: Methods to add handlers and select or toggle active element
 */

import React from 'react';


export const changeActiveElement = function(e) {
	// Selects smart component on click

	let el;

	// Handler gives this function an event, but we give it a dom element
	if (e.clientX != null) {
		el = (e.toElement == undefined)? e.target : e.toElement;
	} else {
		el = e;
	}

	try {

		// Toggle active on click of same element
		if (el.id === this.props.activeElement.id) {
			this.unsetActive(this.props.activeElement);
			this.props.resetActive();
			return;
		}

		// Only allow smart components to be selected as active
		// Go to parent if current node is not smart

		if ((!el.classList.contains('container')) && (!el.classList.contains('content')) && (!el.classList.contains('editor'))) {
			// Move up a node
			return this.changeActiveElement(el.parentNode)
		}
		// Any element that has a class of 'editor' cannot be made active
		if (el.classList.contains('editor')) {
			return;
		}

		// End parent select if we click
		if (this.props.parentSelectOn === true) {

			this.confirmParent()
			return;
		}

		// Unset the previous active element
		this.unsetActive(this.props.activeElement);

		// Set the new element as active
		this.setAsActive(el);

	} catch (e) {
		// if something clicked on isn't in state
		console.warn(e);
	}
}

export const setAsActive = function(el) {

	// Add the active class, send element to the store
	el.classList.add('active');
	this.props.selectNewElement(el);
}

export const unsetActive = function(el) {

	// Remove the active class from the element
	if (el.id === 'noneSelected') {
		return
	}
	el = document.getElementById(el.id);
	el.classList.remove('active');
}


export const addClickHandler = function() {
	// Call changeActiveElement for any clicks
	document.addEventListener('click', this.changeActiveElement);

}

export const removeClickHandler = function() {
	// Removes click handler
	document.removeEventListener('click', this.changeActiveElement);
}
