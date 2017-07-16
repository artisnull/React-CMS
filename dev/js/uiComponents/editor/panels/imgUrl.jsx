/*
Filename: imgUrl.jsx
Author: Zach Lambert
Last Updated: 17 Apr 2017
Description: Panel for changing the img url
 */

import React from 'react';

export const getUrlSect = function(state) {
	// Builds and returns panel to edit url

	// For editpanel, manipulate obj called state to match creatorpanel
	if ((state.activeElement != null) && (state.activeElement.id !== '')) {

		state = Object.assign({}, state.activeElement);
	}

	let isImg = /img$/;

	// Only img components get this panel
	if (isImg.test(state.type.toLowerCase())) {

			return (
				<div className="editor">
					<span>URL:</span>
					<input data-type='url' value={state.url} onChange={(e) => this.setValue(e)} type="text"/>
				</div>
			)
	}
}
