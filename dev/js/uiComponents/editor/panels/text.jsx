/*
Filename: text.jsx
Author: Zach Lambert
Last Updated: 17 Apr 2017
Description: Panel for changing text content
 */

import React from 'react';

export const getTextSect = function(state) {
	// Builds and returns panel to edit text content

	// For editpanel, manipulate obj called state to match creatorpanel
	if ((state.activeElement != null) && (state.activeElement.id !== '')) {

		state = Object.assign({}, state.activeElement);
	}

	let isText = /paragraph|headline|label$/;

	// Only text components get this panel
	if (isText.test(state.type.toLowerCase())) {

		// paragraphs get a textarea
		if (state.type.toLowerCase() === 'paragraph') {

			return (
				<div className="editor">
					<span>Content:</span>
					<textarea data-type='content' value={state.content} onChange={(e) => this.setValue(e)} cols="30" rows="10"></textarea>
				</div>
			)

			// Labels and headlines get a single line of content
		} else {

			return (
				<div className="editor">
					<span>Content:</span>
					<input data-type='content' value={state.content} onChange={(e) => this.setValue(e)} type="text"/>
				</div>
			)
		}
	}
}
