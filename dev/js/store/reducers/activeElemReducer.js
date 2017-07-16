/*
Filename: editorReducer.js
Author: Zach Lambert
Last Updated: 17 Apr 2017
Description: Handles state for active element

editorReducer: activeElement
 */

import React from 'react';
const defaultElem = {
	id: 'noneSelected',
	name: '',
	content: '',
}
export const activeElemReducer = (state = {activeElement: defaultElem}, action) => {

	switch (action.type) {

		case 'SAVE_ELEM':
		{
			return {
				activeElement: action.element
			}
		}
		break;

		case 'SELECT_ELEM':
		{
			return {
				activeElement: action.element
			}
		}
		break;

		case 'RESET_ELEM':
		{
			return {
				activeElement: defaultElem
			}
		}

		break;

		default:
			return state;
	}
}
