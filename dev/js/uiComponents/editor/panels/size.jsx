/*
Filename: size.jsx
Author: Zach Lambert
Last Updated: 17 Apr 2017
Description: Panel for selecting height and width
 */

import React from 'react';
import extractVal from '../../../methods/extractVal.js'

const widthArr = ['25', '33', '50', '66', '75', '100']
const heightArr = ['50', '100', '150', '200', '250', '300', '350', '400', '450', '500', 'auto']

export const getWidthSect = function(state) {
	// Width section : Dropdown of width options

	this.hyrdrateWidth = hyrdrateWidth.bind(this);


	// For editpanel, manipulate obj called state to match creatorpanel
	if ((state.activeElement != null) && (state.activeElement.id !== '')) {

		state = Object.assign({}, state.activeElement);
		state['size-width'] = extractVal('size-width', state.className);
	}

	let isContainer = /spacer|section$/;

	// Only containers get this panel
	if (isContainer.test(state.type.toLowerCase())) {

		return(
			<div className='editor sizeSect'>
				<span>Width</span>
				<div>
					{this.hyrdrateWidth(state)}
				</div>
			</div>
		)
	}

}

const hyrdrateWidth = function(state) {
	// Builds and returns width options, based on widthArr

	return (
		<select data-type='size-width' value={state['size-width']} onChange={(e) => this.setValue(e)}>
			{widthArr.map((width)=>{
				return <option key={width} value={'size-width-' + width}>{width + '%'}</option>
			})}
		</select>
	)
}



export const getHeightSect = function(state) {
	// Height section : Dropdown of height options

	this.hydrateHeight = hydrateHeight.bind(this);


	// For editpanel, manipulate obj called state to match creatorpanel
	if ((state.activeElement != null) && (state.activeElement.id !== '')) {

		state = Object.assign({}, state.activeElement);
		state['size-height'] = extractVal('size-height', state.className);
	}

	let isContainer = /spacer|section$/;

	// Only containers get this panel
	if (isContainer.test(state.type.toLowerCase())) {

		return(
			<div className='editor sizeSect'>
				<span>Height</span>
				<div>
					{this.hydrateHeight(state)}
				</div>
			</div>
		)
	}

}

const hydrateHeight = function(state) {
	// Builds and returns height options, based on heightArr

	return (
		<select data-type='size-height' value={state['size-height']} onChange={(e) => this.setValue(e)}>
			{heightArr.map((height)=>{
				let hs = height;

				if (height !== 'auto') hs += 'px';

				return <option key={height} value={'size-height-' + height}>{hs}</option>
			})}
		</select>
	)
}
