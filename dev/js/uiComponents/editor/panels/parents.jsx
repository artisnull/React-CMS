/*
Filename: parents.jsx
Author: Zach Lambert
Last Updated: 17 Apr 2017
Description: Panel for selecting the parent of the component to be created
 */

import React from 'react';


const startParentSelect = function() {
	// Triggers parent selection mode

	this.props.enableParentSelect();
	document.getElementById('creatorPanel').classList.add('seethru');
}

export const getParentSect = function(state) {
	// Builds and returns panel to select parent

	this.startParentSelect = startParentSelect.bind(this);

	// Every component except for pages gets this panel
	if (state.type.toLowerCase() != 'page') {
		return (
			<div className='editor parentSect'>
				<span>Parent:</span>
				<span>{state.parent.id}</span>
				<button onClick={this.startParentSelect}><i className="material-icons">touch_app</i></button>
			</div>
		)
	}
}
