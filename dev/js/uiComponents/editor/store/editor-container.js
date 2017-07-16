/*
Filename: editor-container.js
Author: Zach Lambert
Last Updated: 17 Apr 2017
Description: Exposes to the editor parent the props and methods needed to display
the correct controls during posEdit and parentSelect, and to hydrate the
global font array

Props: parentSelectOn, posEditOn,
PropMethods: disablePosEdit, disableParentSelect, resetPos, resetParentSelect,
setFontList
 */

import React from 'react';
import {connect} from 'react-redux';

import Editor from '../ui/editor.jsx';

import {selectNewElement, resetActive} from '../../../store/actions/activeElem-actions.js';
import {disableParentSelect, resetParentSelect} from '../../../store/actions/parentSelect-actions.js';
import {disablePosEdit, resetPos} from '../../../store/actions/posEdit-actions.js';
import {setFontList} from '../../../store/actions/font-actions.js'

const mapStatetoProps = (state) => {

	return {
		parentSelectOn: state.parSelectToggReducer.parentSelectOn,
		posEditOn: state.posEditReducer.posEditOn,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {

		disablePosEdit: () => {
			dispatch(disablePosEdit())
		},

		disableParentSelect: () => {
			dispatch(disableParentSelect())
		},

		resetParentSelect: () => {
			dispatch(resetParentSelect())
		},

		resetPos: () => {
			dispatch(resetPos())
		},

		setFontList: (obj, arr) => {
			dispatch(setFontList(obj,arr))
		}
	}
}

export default connect(mapStatetoProps,mapDispatchToProps)(Editor);
