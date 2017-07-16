/*
Filename: position.jsx
Author: Zach Lambert
Last Updated: 17 Apr 2017
Description: Panel for selecting position, handles startPosEdit and stopPosEdit
 */

import React from 'react';
import extractVal from '../../../methods/extractVal.js'


const posObj = {
	'pos-absolute' : 'pos-relative',
	'pos-relative' : 'pos-absolute'
};
const posIcons = {
	'pos-absolute' : 'open_with',
	'pos-relative' : 'view_quilt'
};


export const getPositionSect = function(state) {
	// Shows panel to toggle position: static and position: absolute

	this.hydratePos = hydratePos.bind(this);
	this.startPosEdit = startPosEdit.bind(this);

	// For editpanel, manipulate obj called state to match creatorpanel
	if ((state.activeElement != null) && (state.activeElement.id !== '')) {

		state = Object.assign({}, state.activeElement);
		state.pos = extractVal('pos-', state.className);
		state.coords = extractVal('coord', state.className);
	}

	let isContainer = /spacer|section$/;

	// Only containers get this panel
	if (isContainer.test(state.type.toLowerCase())) {

		let options = '';

		// Position absolute gets the additional UI
		if (state.pos === 'pos-absolute') {
			let icon = this.props.posEditOn ? 'lock_open' : 'lock_outline';
			options = (
				<div className='editor pos-choice'>
					<div className="pos-editToggle" onClick={this.startPosEdit}><i className="material-icons">{icon}</i></div>
					<div className="editCoords">
						<span>({state.coords.split('_')[1]}, {state.coords.split('_')[2]})</span>
					</div>
				</div>
			)
		}

		// Both position options get this
		return (
			<div className='editor posSect'>
				<span>Position</span>
				{this.hydratePos(state)}
				{options}
			</div>
		)

	}
}


const hydratePos = function(state) {
	// builds and returns position options

	return (
		<div className={state['pos'] + '-choice pos-choice'} data-type='pos' data-value={posObj[state['pos']]} onClick={(e)=>this.setValue(e)}><i className="material-icons">{posIcons[state['pos']]}</i></div>
	)
}


const startPosEdit = function() {
	// Enables position edit mode

	let el = document.getElementById(this.props.activeElement.id);

	el.classList.add('active-pos-edit');
	el.classList.add('material-icons');

	document.getElementById('editPanel').classList.add('seethru');

	// Get the current coordinates from the class of the active element
	let [xPos, yPos] = extractCoord(el.className);

	this.props.enablePosEdit({left:xPos, top:yPos});

}

export const stopPosEdit = function(props) {
	// Ends position edit mode

	let el = document.getElementById(this.props.activeElement.id);

	// If no change, don't update the class, just set the position back to where it was
	if ((props.newCoords.left === props.initCoords.left) && (props.newCoords.top === props.initCoords.top)) {

		el.style.left = props.initCoords.left + 'px';
		el.style.top = props.initCoords.top + 'px';
		this.props.clearPos()
		return;

		// If the element hasn't been positioned before, and the posEdit mode is cancelled without choice
	} else if ((String(props.initCoords.left) === 'NaN') && (String(props.newCoords.top) === 'NaN')) {

		el.style.left = '';
		el.style.top = '';
		return;

		// If empty value
	} else if (props.newCoords.left === '') {
		return;
	}

	// Build coord value from new coordinates
	let coords = `coord_${props.newCoords.left}_${props.newCoords.top}`;

	el.setAttribute('data-type', 'coord');
	el.setAttribute('data-value', coords);

	this.setValue({target: el});

}


const extractCoord = function(cN) {
// Coordinates are in form 'coord_'xVal'_'yVal''
	let classes = cN.split(' ');
	let xPos, yPos;

	// Find class with coordinates and parse
	for (let i = 0; i < classes.length; i++) {

		if (classes[i].includes('coord_')) {

			let coords = classes[i].split('_');

			xPos = parseInt(coords[1]);
			yPos = parseInt(coords[2]);
		}

	}

	return [xPos, yPos];
}
