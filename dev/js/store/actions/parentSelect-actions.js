/*
Filename: parentSelect-actions.js
Author: Zach Lambert
Last Updated: 17 Apr 2017
Description: Actions to change parentSelection state

corresponds with: parentSelectReducer
 */

export const enableParentSelect = () => {
	// Turn on parentSelection
	return {
		type: 'PARENT_SELECT_ON'
	}
}

export const disableParentSelect = () => {
	// Turn off parentSelection
	return {
		type: 'PARENT_SELECT_OFF'
	}
}

export const selectNewParent = (el) => {
	// Add new parent reference to state
	let type = el.getAttribute('data-element');

	let elObj = {
		id: el.id,
		name: el.getAttribute('name'),
		type: type,
	};

	return {
		type: 'SEL_NEW_PARENT',
		parent : elObj
	}
}

export const resetParentSelect = () => {
	// Reset parent reference to null
	return {
		type: 'RESET_PARENT',
	}
}
