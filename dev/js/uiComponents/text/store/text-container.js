/*
Filename: text-container.js
Author: Zach Lambert
Last Updated: 17 Apr 2017
Description: Connects Text to its reference in the store, exposes the
available fonts from Google Fonts API, responds to deletion
Props: ownData, fontObj, fontArr, activeElement, deleted
PropMethods: none
 */

import React from 'react';
import {connect} from 'react-redux';
import Text from '../ui/text.jsx';

const mapStatetoProps = (state, ownProps) => {

	let activeElement = state.activeElemReducer.activeElement;
	let deleted = false;

	// Listen to store section corresponding to this container's id
	const type = ownProps.dataElement;
	const id = ownProps.id;

	let coll = state.elemCollReducer;
	const ownData = coll[type.toLowerCase() + 's'].byId[id]

	// If element has been deleted, don't continue
	if (ownData == null) {
		deleted = true;
	}

	return {
		ownData,
		fontObj: state.fontReducer.fontObj,
		fontArr: state.fontReducer.fontArr,
		activeElement,
		deleted,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {}
}

export default connect(mapStatetoProps, mapDispatchToProps)(Text);
