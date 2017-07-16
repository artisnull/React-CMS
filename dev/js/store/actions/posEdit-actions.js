/*
Filename: editorReducer.js
Author: Zach Lambert
Last Updated: 17 Apr 2017
Description: Handles state for active element

editorReducer: activeElement
 */
export const disablePosEdit = () => {
	return {
		type: 'END_POS_EDIT'
	}
}

export const enablePosEdit = (coords) => {

	return {
		type: 'START_POS_EDIT',
		left: coords.left,
		top: coords.top,
	}
}

export const updatePos = (coords) => {

	return {
		type: 'UPDATE_POS',
		left: coords.left,
		top: coords.top
	}
}

export const resetPos = () => {
	return {
		type: 'RESET_POS',
	}
}

export const clearPos = () => {
	return {
		type: 'CLEAR_POS',
	}
}
