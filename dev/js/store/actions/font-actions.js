/*
Filename: font-actions.js
Author: Zach Lambert
Last Updated: 17 Apr 2017
Description: Actions to set global font state

Corresponds with: fontReducer
 */
export const setFontList = (fontObj, fontArr) => {

	return {
		type: 'SET_FONT_LIST',
		fontArr,
		fontObj,
	}
}
