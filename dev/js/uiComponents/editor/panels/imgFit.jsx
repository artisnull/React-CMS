/*
Filename: imgFit.jsx
Author: Zach Lambert
Last Updated: 17 Apr 2017
Description: Panel for selecting img fit options
 */

import React from 'react';
import extractVal from '../../../methods/extractVal.js'

const fitOptsArr = ['cover', 'fill', 'contain'];

export const getImgFitSect = function(state) {
	// Builds and returns panel to select img fit

	this.hydrateFitOpts = hydrateFitOpts.bind(this);

	// For editpanel, manipulate obj called state to match creatorpanel
	if ((state.activeElement != null) && (state.activeElement.id !== '')) {

		state = Object.assign({}, state.activeElement);
		state['img-fit'] = extractVal('img_fit_', state.className);
	}


	let isImg = /img$/;

	// Only img components get this panel
	if (isImg.test(state.type.toLowerCase())) {

		return(
			<div className='editor' id="imgFitSect">
				<h3>Image Fit:</h3>
				<select data-type='img-fit' value={state['img-fit']} onChange={(e)=>this.setValue(e)} >
					{this.hydrateFitOpts(state)}
				</select>
			</div>
		)
	}
}

const hydrateFitOpts = function(state) {
	// Builds and returns img fit options based on fitOptsArr

	return fitOptsArr.map((fitOpt)=>{
		return (
			<option data-type='img-fit' key={fitOpt} value={`img_fit_${fitOpt}`}>{fitOpt}</option>
		)
	})
}
