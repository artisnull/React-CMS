/*
Filename: container-container.js
Author: Zach Lambert
Last Updated: 17 Apr 2017
Description: Connects Container to its reference in the store, hydrates children
of container, responds to deletion
Props: ownData, childData, activeElement, deleted
PropMethods: none
 */
import React from 'react';
import {connect} from 'react-redux';
import Container from '../ui/container.jsx';

const mapStatetoProps = (state, ownProps) => {

	let activeElement = state.activeElemReducer.activeElement;
	let deleted = false;

	const type = ownProps.dataElement;
	const id = ownProps.id;

	// Listen to store section corresponding to this container's id
	let coll = state.elemCollReducer;
	const ownData = coll[type.toLowerCase() + 's'].byId[id];
	let childData = [];

	// If element has been deleted, don't continue
	if (ownData == null) {
		deleted = true;
	} else {
		// Hydrate children elements
		for (let i = 0; i < ownData.children.length; i++) {

			let cType = ownData.children[i].type;
			let cId = ownData.children[i].id;
			let thisChild = coll[cType.toLowerCase() + 's'].byId[cId]

			childData.push(thisChild);
		}

	}

	return {
		ownData,
		childData,
		activeElement,
		deleted
	}
}
// No methods
const mapDispatchToProps = (dispatch) => {
	return {}
}

export default connect(mapStatetoProps, mapDispatchToProps)(Container);
