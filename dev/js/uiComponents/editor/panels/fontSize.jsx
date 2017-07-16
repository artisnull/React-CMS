/*
Filename: fontSize.jsx
Author: Zach Lambert
Last Updated: 17 Apr 2017
Description: Panel for selecting font size
 */

import React from 'react';
import extractVal from '../../../methods/extractVal.js'


const fontSizeArr = ['8','9',
'10','11','12','13','14','15','16','17','18','19',
'20','21','22','23','24','25','26','27','28','29',
'30','31','32','33','34','35','36','37','38','39','40'];


export const getFontSizeSect = function(state) {
	// Builds and returns panel to select font size

	this.hydrateFontSizes = hydrateFontSizes.bind(this);

	// For editpanel, manipulate obj called state to match creatorpanel
	if ((state.activeElement != null) && (state.activeElement.id !== '')) {

		state = Object.assign({}, state.activeElement);
		state.fontSize = extractVal('fs_', state.className);
	}


	let isText = /paragraph|headline|label$/;

	// Only text components get this panel
	if (isText.test(state.type.toLowerCase())) {

		return(
			<div className='editor' id="fontSizeSect">
				<h3>Font Size:</h3>
				<select data-type='font-size' value={state.fontSize} onChange={(e)=>this.setValue(e)} >
					{this.hydrateFontSizes(state)}
				</select>
			</div>
		)
	}
}

const hydrateFontSizes = function(state) {
	// Builds and returns font size options, based on fontSizeArr

	return fontSizeArr.map((fontSize)=>{
		return (
			<option data-type='font-size' key={fontSize} value={`fs_${fontSize}`}>{fontSize}</option>
		)
	})
}
