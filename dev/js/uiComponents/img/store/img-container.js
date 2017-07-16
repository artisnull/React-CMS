/*
Filename: img-container.js
Author: Zach Lambert
Last Updated: 17 Apr 2017
Description: UI Element for Container, updates when the correlating container
in the collection has changed. Parses classname for coordinates when absolutely
positioned.
Props: ownData, deleted
PropMethods: none
 */
import React from 'react';
import {connect} from 'react-redux';
import Img from '../ui/imgComponent.jsx';

const mapStatetoProps = (state, ownProps) => {

	// Listen to store section corresponding to this img's id
	const type = ownProps.dataElement;
	const id = ownProps.id;
	let deleted = false;
	let coll = state.elemCollReducer;
	const ownData = coll[type.toLowerCase() + 's'].byId[id];

	// If element has been deleted, don't continue
	if (ownData == null) {
		deleted = true;
	}

	return {
		ownData,
		deleted
	}
}

const mapDispatchToProps = (dispatch) => {
	return {}
}

export default connect(mapStatetoProps, mapDispatchToProps)(Img);
