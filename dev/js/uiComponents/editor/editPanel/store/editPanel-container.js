/*
Filename: editPanel-container.js
Author: Zach Lambert
Last Updated: 17 Apr 2017
Description: Connects editPanel to store

Props: activeElement, initCoords, newCoords, posEditOn,fontArr, fontObj
PropMethods: addToCollection, removeFromCollection, editElement, selectNewElement, resetActive, enablePosEdit, disablePosEdit, clearPos
 */

import React from 'react';
import {connect} from 'react-redux';

import EditPanel from '../ui/editPanel.jsx';

import {addToCollection, removeFromCollection, editElement} from '../../../../store/actions/collection-actions.js'
import {selectNewElement, resetActive} from '../../../../store/actions/activeElem-actions.js';
import {enablePosEdit, disablePosEdit, resetPos, clearPos} from '../../../../store/actions/posEdit-actions.js';

const mapStatetoProps = (state) => {

	let st = {
		activeElement: state.activeElemReducer.activeElement,
		initCoords: state.posEditReducer.initCoords,
		newCoords: state.posEditReducer.newCoords,
		posEditOn: state.posEditReducer.posEditOn,
		fontArr: state.fontReducer.fontArr,
		fontObj: state.fontReducer.fontObj,
	};

	// Clickcatcher will update active element, we get the actual el from the collection
	// for edit panel to read updates from
	if (st.activeElement.id != 'noneSelected') {
		st.activeElement = state.elemCollReducer[st.activeElement.type.toLowerCase() + 's'].byId[st.activeElement.id]
	}
	return st
}

const mapDispatchToProps = (dispatch) => {
	// console.log(goToView('ABOUT'));
	return {
		removeFromCollection: (element) => {
			dispatch(removeFromCollection(element))
		},

		resetActive: () => {
			dispatch(resetActive())
		},

		selectNewElement: (element) => {
			dispatch(selectNewElement(element))
		},

		editElement: (id, field) => {
			dispatch(editElement(id, field))
		},

		enablePosEdit: (coords) => {
			dispatch(enablePosEdit(coords))
		},

		disablePosEdit: () => {
			dispatch(disablePosEdit())
		},

		clearPos: () => {
			dispatch(clearPos())
		},
	}
}

export default connect(mapStatetoProps, mapDispatchToProps)(EditPanel);
