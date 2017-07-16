/*
Filename: shadows.jsx
Author: Zach Lambert
Last Updated: 17 Apr 2017
Description: Panel for selecting shadow depth level
 */

import React from 'react';
import extractVal from '../../../methods/extractVal.js'


const shaArr = ['sha-lvl-0', 'sha-lvl-1', 'sha-lvl-2', 'sha-lvl-3', 'sha-lvl-4', 'sha-lvl-5', ];


export const getShadowSect = function(state) {
	// Builds and returns panel for selecting shadow level

	// For editpanel, manipulate obj called state to match creatorpanel
	if ((state.activeElement != null) && (state.activeElement.id !== '')) {

		state = Object.assign({}, state.activeElement);
		state.sha = extractVal('sha-', state.className);
	}

	this.getShadowLevel = getShadowLevel.bind(this);


	let isSection = /section$/;

	// Only sections get this panel
	if (isSection.test(state.type.toLowerCase())) {
		return (
			<div className="editor shadowSect">
				<span>Shadow Level:</span>
				<div className="shadow-lvl-sect">
					{this.getShadowLevel(state)}
				</div>
			</div>
		)
	}
}

const getShadowLevel = function(state) {
	// Builds and returns buttons for changing shadow lvl

	let index = shaArr.indexOf(state.sha);
	let remBut = 'sha-lvl-choice';
	let addBut = 'sha-lvl-choice';

	// Determine which buttons are active
	if (index === 0) {
		remBut += ' inactive-sha-lvl-choice';
	} else if (index === shaArr.length-1) {
		addBut += ' inactive-sha-lvl-choice';
	}

	return (
		<div className="editor">
			<button className={remBut} data-type='sha-lvl' data-value={shaArr[index-1]} onClick={(e)=>this.setValue(e)} ><i className="material-icons">remove_circle_outline</i></button>
			<span>{index}</span>
			<button className={addBut} data-type='sha-lvl' data-value={shaArr[index+1]} onClick={(e)=>this.setValue(e)} ><i className="material-icons">add_circle_outline</i></button>
		</div>
	)
}
