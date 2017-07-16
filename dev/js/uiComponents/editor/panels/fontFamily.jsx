/*
Filename: fontFamily.jsx
Author: Zach Lambert
Last Updated: 17 Apr 2017
Description: Panel for selecting font font family and weight
 */

import React from 'react';
import extractVal from '../../../methods/extractVal.js'


export const getFontFamSect = function(state) {
	// Builds and returns panels for selecting font fam and weight


	this.hydrateFontFamilies = hydrateFontFamilies.bind(this);
	this.hydrateFontWeight = hydrateFontWeight.bind(this);

	// For editpanel, manipulate obj called state to match creatorpanel
	if ((state.activeElement != null) && (state.activeElement.id !== '')) {

		state = Object.assign({}, state.activeElement);
		state.fontFam = extractVal('ff_', state.className);
		state.fontWeight = extractVal('fw_', state.className);
	}

	let isText = /paragraph|headline|label$/;

	// Only text components get this panel
	if (isText.test(state.type.toLowerCase())) {

		return(
			<div className='editor' id="fontFamSect">
				<h3>Font:</h3>
				<select data-type='font-family' value={state.fontFam} onChange={(e)=>this.setValue(e)} >
					{this.hydrateFontFamilies(state)}
				</select>
				<h3>Font Weight:</h3>
				<select data-type='font-weight' value={state.fontWeight} onChange={(e)=>this.setValue(e)} >
					{this.hydrateFontWeight(state)}
				</select>
			</div>
		)

	}

}

const hydrateFontFamilies = function(state) {
	// Builds and returns options for font family, based on the global font array

	let fontArr = this.props.fontArr;

	return fontArr.map((fontName)=>{
		return (
			<option data-type='font-family' key={fontName} value={'ff_'+fontName.replace(/ /g, '-')}>{fontName}</option>
		)
	})
}

const hydrateFontWeight = function(state) {
	// Builds and returns options for font weight, based on the selected font and
	// the global font obj

	let fontArr = this.props.fontArr;
	let fontObj = this.props.fontObj;

	// find index of current font
	let fIndex = fontArr.indexOf(state.fontFam.substring(3).replace(/-/g, ' '));

	let weightArr = fontObj[fIndex].variants;

	return weightArr.map((fWeight)=>{
		return (
			<option data-type='font-weight' key={fWeight} value={'fw_'+fWeight}>{fWeight}</option>
		)
	})
}
