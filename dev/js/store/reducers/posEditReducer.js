/*
Filename: editingState.js
Author: Zach Lambert
Last Updated: 17 Apr 2017
Description: Handles state for position editing

posEditingState: posEditOn, initCoords, newCoords
 */

import React from 'react';

const defState2 = {
	posEditOn: false,
	initCoords: {
		left: '',
		top: '',
	},
	newCoords: {
		left: '',
		top: '',
	},
}

export const posEditReducer = (state = defState2, action) => {

	switch (action.type) {

		case 'START_POS_EDIT':
			return Object.assign({}, state, {
				posEditOn: true,
				initCoords: Object.assign({}, state.initCoords, {
					left: action.left,
					top: action.top
				}),
			});
		break;

		case 'END_POS_EDIT':
			return Object.assign({}, state, {posEditOn: false});
		break;

		case 'UPDATE_POS':
		return Object.assign({}, state, {
			newCoords: Object.assign({}, state.newCoords, {
				left: action.left,
				top: action.top
			}),
		});
		break;

		case 'RESET_POS':
		return Object.assign({}, state, {
			newCoords: Object.assign({}, state.newCoords, {
				left: state.initCoords.left,
				top: state.initCoords.top
			}),
			posEditOn: false,
		});
		break;

		case 'CLEAR_POS':

		return defState2;

		break;

		default:
		return state;
	}
}
