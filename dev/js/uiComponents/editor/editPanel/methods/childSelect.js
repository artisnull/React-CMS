/*
Filename: childSelect.js
Author: Zach Lambert
Last Updated: 17 Apr 2017
Description: Methods to select and make active a child from the children panel
 */

 export const selectActiveFromMenu = function(el) {
	//  Replace the active element with the selected one

	 let id = el.getAttribute('data-target');
	 el = document.getElementById(id);

	 this.unsetActive(this.props.activeElement);
	 this.setAsActive(el);
 }


export const unsetActive = function(el) {
	// Remove the 'active' class from the previous active element

	// If the previous element was the default, does not exist
	if (el.id === 'noneSelected') {
		return
	}

	el = document.getElementById(el.id);
	el.classList.remove('active');
}


export const setAsActive = function(el) {
	// Add 'active' class and set el as active element

	el.classList.add('active');
	this.props.selectNewElement(el);
}
