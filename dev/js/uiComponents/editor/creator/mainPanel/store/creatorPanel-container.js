/*
Filename: creatorPanel-container.js
Author: Zach Lambert
Last Updated: 17 Apr 2017
Description: Connects CreatorPanel to store

Props: activeParent
PropMethods: addToCollection, enableParentSelect, disableParentSelect, resetParentSelect
 */

import React from 'react';
import {connect} from 'react-redux';

import CreatorPanel from '../ui/creatorPanel.jsx';

import {addToCollection} from '../../../../../store/actions/collection-actions.js'
import {enableParentSelect, disableParentSelect, resetParentSelect} from '../../../../../store/actions/parentSelect-actions.js';

// CONTAINER
const mapStatetoProps = (state) => {

	return {
		activeParent: state.parentClickReducer.activeParent,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		enableParentSelect: () => {
			dispatch(enableParentSelect())
		},

		disableParentSelect: () => {
			dispatch(disableParentSelect())
		},

		resetParentSelect: () => {
			dispatch(resetParentSelect())
		},

		addToCollection: (element) => {
			dispatch(addToCollection(element))
		},
	}
}

export default connect(mapStatetoProps,mapDispatchToProps)(CreatorPanel);
