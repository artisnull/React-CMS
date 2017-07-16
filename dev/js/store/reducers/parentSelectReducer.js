/*
Filename: clickReducer.js (aggregate reducer)
Author: Zach Lambert
Last Updated: 17 Apr 2017
Description: Handles state for parent selection

clickReducer: parentSelectOn
parentClickReducer: activeParent
 */

import React from 'react';

const defaultState = {
	parentSelectOn: false
};

export const parSelectToggReducer = (state = defaultState, action) => {

	switch (action.type) {
		case 'PARENT_SELECT_ON':
		{
			return Object.assign({}, state, {parentSelectOn: true});
		}
		break;

		case 'PARENT_SELECT_OFF':
		{
			return Object.assign({}, state, {parentSelectOn: false});
		}
		break;

		default:
			return state;
	}
}

const defaultState2 = {
	activeParent: {
		id: '',
		name: '',
		type: '',
	}
};

export const parentClickReducer = (state = defaultState2, action) => {

	switch (action.type) {
		case 'SEL_NEW_PARENT':
		{
			return Object.assign({}, state,
				{
					activeParent: Object.assign({}, state.parent,
					{
						id: action.parent.id,
						type: action.parent.type,
						name: action.parent.name
					}),
				});
		}
		break;

		case 'RESET_PARENT':
		{
			return defaultState2;
		}
		break;

		default:
			return state;
	}
}
