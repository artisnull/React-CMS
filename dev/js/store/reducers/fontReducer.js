/*
Filename: fontReducer.js
Author: Zach Lambert
Last Updated: 17 Apr 2017
Description: Handles the global font array

fontReducer: fontArr, fontObj
 */

import React from 'react';

const defaultElem = {
	fontArr: [],
}

export const fontReducer = (state = defaultElem, action) => {

	switch (action.type) {
		case 'SET_FONT_LIST':
		{
			return Object.assign({}, state, {
				fontArr: action.fontArr,
				fontObj: action.fontObj,
			})
		}
		break;

		default:
			return state;
	}
}
