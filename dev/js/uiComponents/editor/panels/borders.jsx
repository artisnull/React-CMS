/*
Filename: borders.jsx
Author: Zach Lambert
Last Updated: 17 Apr 2017
Description: Panel for selecting border color and border width
 */

import React from 'react';

import extractVal from '../../../methods/extractVal.js'

export const colorList = ['red', 'pink', 'purple', 'deep_purple', 'indigo', 'blue', 'light_blue', 'cyan', 'teal', 'green', 'light_green', 'lime', 'yellow', 'amber', 'orange', 'deep_orange', 'brown', 'grey', 'blue_grey', 'black', 'white'];

const widthMap = {
	'bor-width-0' : 0,
	'bor-width-1' : 1,
	'bor-width-2' : 2,
	'bor-width-5' : 3,
	'bor-width-10' : 4,
	'bor-width-15' : 5,
	'bor-width-20' : 6,
	'bor-width-25' : 7,
	'bor-width-50' : 8,
}

const widthArr = ['bor-width-0', 'bor-width-1', 'bor-width-2', 'bor-width-5', 'bor-width-10', 'bor-width-15', 'bor-width-20', 'bor-width-25', 'bor-width-50']

export const getBorderSect = function(state) {
	// Returns jsx border sections

	// For editpanel, manipulate obj called state to match creatorpanel
	if ((state.activeElement != null) && (state.activeElement.id !== '')) {

		state = Object.assign({}, state.activeElement);
		state.borderColor = extractVal('bor-color', state.className);
		state.borderWidth = extractVal('bor-width', state.className);

	}

	this.getBorderColors = getBorderColors.bind(this);
	this.getBorderWidth = getBorderWidth.bind(this);

	let isContainer = /section|spacer$/;

	// Only displays for container components
	if (isContainer.test(state.type.toLowerCase())) {

		// Only show width option if width is 0
		if (state.borderWidth === 'bor-width-0') {
			return (
				<div className="editor borderSect">
					<span>Border Width:</span>
					<div className="border-width-sect">
						{this.getBorderWidth(state)}
					</div>
				</div>
			)

		} else {
			// Show both width and color options
			return (

				<div className="editor borderSect">
					<span>Border Width:</span>
					<div className="border-width-sect">
						{this.getBorderWidth(state)}
					</div>
					<span>Border Color:</span>
					<div className="border-color-sect colorPickContainer">
						{this.getBorderColors(state)}
					</div>
				</div>
			)
		}
	} else {
		return ''
	}

}

const getBorderColors = function(state) {
	// Builds and returns color choice for border color selection

	let classColor;

	return colorList.map((color)=>{

		// Make the selected color 'active'
		if (state.borderColor === 'bor-color-' + color) {
			classColor = color + ' active-bor-color';
		} else {
			classColor = color;
		}
		return <div key={'bor-' + color} data-type='bor-color' data-value={'bor-color-'+color} onClick={(e)=>this.setValue(e)} className={'color-choice back-' + classColor}></div>
	})
}

const getBorderWidth = function(state) {
	// Builds and returns width choices

	let index = widthArr.indexOf(state.borderWidth);
	let remBut = 'bor_width-choice';
	let addBut = 'bor_width-choice';

	// Determine which buttons should be active
	if (index === 0) {
		remBut += ' inactive-bor_width-choice';
	} else if (index === 8) {
		addBut += ' inactive-bor_width-choice';
	}

	return (
		<div className="editor">
			<button className={remBut} data-type='bor-width' data-value={widthArr[index-1]} onClick={(e)=>this.setValue(e)} ><i className="material-icons">remove_circle_outline</i></button>
			<span>{index}</span>
			<button className={addBut} data-type='bor-width' data-value={widthArr[index+1]} onClick={(e)=>this.setValue(e)} ><i className="material-icons">add_circle_outline</i></button>
		</div>
	)
}
