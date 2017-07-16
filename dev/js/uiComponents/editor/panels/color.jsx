/*
Filename: colors.jsx
Author: Zach Lambert
Last Updated: 17 Apr 2017
Description: Panel for selecting background color and font color
 */

import React from 'react';
import extractVal from '../../../methods/extractVal.js'

export const colorList = ['red', 'pink', 'purple', 'deep_purple', 'indigo', 'blue', 'light_blue', 'cyan', 'teal', 'green', 'light_green', 'lime', 'yellow', 'amber', 'orange', 'deep_orange', 'brown', 'grey', 'blue_grey', 'black', 'white'];

const getBackgroundColorDivs = function(state) {
	// Builds and returns background color options

	let classColor;

	return colorList.map((color)=>{

		// Make selected color active
		if (state.backColor === 'back-' + color) {
			classColor = color + ' active-back-color';
		} else {
			classColor = color;
		}
		return <div key={'back' + color} data-type='backColor' data-value={'back-'+color} onClick={(e)=>this.setValue(e)} className={'color-choice back-' + classColor}></div>
	})
}

const getFontColorDivs = function(state) {
	// Builds and returns font color options

	let classColor;

	return colorList.map((color)=>{

		// Make selected color active
		if (state.fontColor === 'font-' + color) {
			classColor = 'font-' + color + '-choice active-font-color';
		} else {
			classColor = 'font-' + color + '-choice';
		}
		return <div key={'font' + color} data-type='fontColor' data-value={'font-'+color} onClick={(e)=>this.setValue(e)} className={'color-choice ' + classColor}></div>
	})
}

export const getColorSect = function(state) {
	// Builds and returns panels for selecting colors

	// For editpanel, manipulate obj called state to match creatorpanel
	if ((state.activeElement != null) && (state.activeElement.id !== '')) {

		state = Object.assign({}, state.activeElement);
		state.fontColor = extractVal('font', state.className);
		state.backColor = extractVal('back', state.className);
	}

	this.getFontColorDivs = getFontColorDivs.bind(this);
	this.getBackgroundColorDivs = getBackgroundColorDivs.bind(this);


	let isText = /paragraph|headline|label$/;
	let isContainer = /spacer|section|page$/;

	// Text components get font color choice
	if (isText.test(state.type.toLowerCase())) {

		return (
			<div className="editor">
				<span>Font Color: </span>
				<div className="colorPickContainer">
					{this.getFontColorDivs(state)}
				</div>
			</div>
		)

		// Containers get background color choice
	} else if (isContainer.test(state.type.toLowerCase())) {

		return (
			<div className="editor">
				<span>Background Color: </span>
					<div className="colorPickContainer">
						{this.getBackgroundColorDivs(state)}
					</div>
			</div>
		)

	}
}


export const getRandomColor = function() {
	// Returns random color from colorList
	return colorList[Math.floor(Math.random() * colorList.length)];
}
