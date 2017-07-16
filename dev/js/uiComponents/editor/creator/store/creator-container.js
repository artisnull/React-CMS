/*
Filename: creator-container.js
Author: Zach Lambert
Last Updated: 17 Apr 2017
Description: Connects creator to store to handle parent select and resetting active element

Props: none
PropMethods: disableParentSelect, resetParentSelect, resetActive
 */

import React from 'react';
import {connect} from 'react-redux';

import Creator from '../ui/creator.jsx';

import {resetActive} from '../../../../store/actions/activeElem-actions.js';
import {disableParentSelect, resetParentSelect} from '../../../../store/actions/parentSelect-actions.js';


// CONTAINER
const mapStatetoProps = (state) => {

	return {}
}

const mapDispatchToProps = (dispatch) => {
	return {
		resetActive: () => {
			dispatch(resetActive())
		},

		disableParentSelect: () => {
			dispatch(disableParentSelect())
		},

		resetParentSelect: () => {
			dispatch(resetParentSelect())
		},

	}
}

export default connect(mapStatetoProps,mapDispatchToProps)(Creator);
