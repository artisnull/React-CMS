/*
Filename: activeElem-actions.js
Author: Zach Lambert
Last Updated: 17 Apr 2017
Description: Actions to change the active element

corresponds with: activeElemReducer
 */

export const selectNewElement = (el) => {
	// Sets up selected element to be added to props

	let type = el.getAttribute('data-element');
	let content, children;

	// Content types will have text
	if (el.classList.contains('content')) {
		content = el.children[0].textContent;
	}

	// Container types may have children
	if (el.classList.contains('container')) {
		children = [];

		// Build barebones array of child references
		for (let i = 0; i < el.children.length; i++) {
			children[i] = {
				id : el.children[i].id,
				type: el.children[i].getAttribute('data-element'),
				name: el.children[i].getAttribute('name'),
			}
		}

	}

	let elObj = {
		id: el.id,
		name: el.getAttribute('name'),
		type: type,
		className: el.className,
		content,
		children
	};

	return {
		type: 'SELECT_ELEM',
		element : elObj
	}
}

export const resetActive = () => {
	// Removes the active element, sets to default/no element
	return {
		type: 'RESET_ELEM',
		element : {id:'noneSelected'}
	}
}
