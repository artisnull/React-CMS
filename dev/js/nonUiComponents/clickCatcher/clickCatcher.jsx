/*
Filename: ClickCatcher.jsx
Author: Zach Lambert
Last Updated: 17 Apr 2017
Description: Handles posEdit, parentSelect, selecting activeElement
Container is included in file, since there is no ui rendered.
Is a react component to access props

Props: activeElement, parentSelectOn, activeParent, posEditOn
PropMethods: selectNewElement, resetActive, selectNewParent, disableParentSelect, updatePos, resetParentSelect, enablePosEdit, disablePosEdit, editElement
 */

import React from 'react';
import ReactDom from 'react-dom';
import {connect} from 'react-redux';

import {selectNewParent, disableParentSelect, resetParentSelect, } from '../../store/actions/parentSelect-actions.js';
import {editElement} from '../../store/actions/collection-actions.js';
import {selectNewElement, resetActive} from '../../store/actions/activeElem-actions.js';
import {enablePosEdit, disablePosEdit, resetPos, updatePos} from '../../store/actions/posEdit-actions.js';

import {changeActiveElement, setAsActive, unsetActive, addClickHandler, removeClickHandler} from './activeElement/activeElementMethods.js'
import {addHoverHandler, removeHoverHandler, identifyParent, highlightParent, unhighlightParent, confirmParent} from './parentSelect/parentSelectMethods.js'
import {editPos, endPosEdit} from './posEdit/posEditMethods.js';
/*
Handles changing the active element based on the component that is clicked
*/
class ClickCatcher extends React.Component{
  constructor() {
    super();
		// activeElement methods
		this.changeActiveElement = changeActiveElement.bind(this);
		this.addClickHandler = addClickHandler.bind(this);
		this.removeClickHandler = removeClickHandler.bind(this);
		this.setAsActive = setAsActive.bind(this);
		this.unsetActive = unsetActive.bind(this);

		// parentSelect methods
		this.addHoverHandler = addHoverHandler.bind(this);
		this.removeHoverHandler = removeHoverHandler.bind(this);
		this.identifyParent = identifyParent.bind(this);
		this.highlightParent = highlightParent.bind(this);
		this.unhighlightParent = unhighlightParent.bind(this);
		this.confirmParent = confirmParent.bind(this);

		// posEdit methods
		this.editPos = editPos.bind(this);
		this.endPosEdit = endPosEdit.bind(this);
  }

	componentDidMount() {
		// Once DOM is mounted, add click handler
		this.addClickHandler();
	}

	componentWillReceiveProps(newProps) {
		// When the prop values are different
		if (newProps.parentSelectOn !== this.props.parentSelectOn) {

			// If off->on
			if (newProps.parentSelectOn) {
				this.addHoverHandler()

			// If on->off
			} else {
				this.confirmParent()
			}
		}

		// When the prop values are different
		if (newProps.posEditOn !== this.props.posEditOn) {

			// If off->on
			if (newProps.posEditOn) {
				this.editPos();

				// If on->off
			} else {
				this.endPosEdit();
			}
		}
	}


  render(){

		// Purely functional component, no dom elemenet
    return (null);
  }
}
//=======================================================================
// CONTAINER
const mapStatetoProps = (state) => {

	return {
		activeElement: state.activeElemReducer.activeElement,
		parentSelectOn: state.parSelectToggReducer.parentSelectOn,
		activeParent: state.parentClickReducer.activeParent,
		posEditOn: state.posEditReducer.posEditOn
	}
}

const mapDispatchToProps = (dispatch) => {

	return {
		selectNewElement: (element) => {
			dispatch(selectNewElement(element))
		},

		resetActive: () => {
			dispatch(resetActive())
		},

		resetParentSelect: () => {
			dispatch(resetParentSelect())
		},

		selectNewParent: (element) => {
			dispatch(selectNewParent(element))
		},

		disableParentSelect: () => {
			dispatch(disableParentSelect())
		},

		enablePosEdit: () => {
			dispatch(enablePosEdit())
		},

		disablePosEdit: () => {
			dispatch(disablePosEdit())
		},

		editElement: (id, field) => {
			dispatch(editElement(id, field))
		},

		updatePos: (coord) => {
			dispatch(updatePos(coord))
		},
	}
}

export default connect(mapStatetoProps,mapDispatchToProps)(ClickCatcher);
