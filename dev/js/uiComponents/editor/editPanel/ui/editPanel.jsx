/*
Filename: editPanel.jsx
Author: Zach Lambert
Last Updated: 17 Apr 2017
Description: UI Component for editing the currently selected element
 */

import React from 'react';

import * as panels from '../../panels/roster.js'
import * as dropFunctions from '../methods/dragDrop.js'
import * as activeFunctions from '../methods/childSelect.js'

import {deleteEl} from '../methods/deleteEl.js'

import changeChildOrder from '../methods/childOrder.js'
import {determineVal} from '../methods/valueParsing.js'

export default class EditPanel extends React.Component{

  constructor(props){
    super(props);

		this.state ={};
		this.state.isActive = false;
		this.state.dragIndex = '';

		// Bind all the necessary functions
		this.deleteEl = deleteEl.bind(this);
		this.setValue = this.setValue.bind(this);

		// All the panels
		for (var panel in panels) {
			this[panel] = panels[panel].bind(this);
		}

		// Drag and drop functionality
		for (var dFunct in dropFunctions) {
			this[dFunct] = dropFunctions[dFunct].bind(this);
		}

		// Child selection functionality
		for (var aFunct in activeFunctions) {
			this[aFunct] = activeFunctions[aFunct].bind(this);
		}

		this.changeChildOrder = changeChildOrder.bind(this);
  }


  componentWillReceiveProps(newProps) {
		// Handles whether panel and/or posEdit is active

		let state = this.state;

		state.isActive = true;
		if (newProps.activeElement.id === 'noneSelected') {
			state.isActive = false;
		}

		if ((!newProps.posEditOn) && (this.props.posEditOn)) {
			this.stopPosEdit(newProps)
		}
		this.setState(state)

  }

	// stopPosEdit(props) {
	// 	let el = document.getElementById(props.activeElement.id);
	//
	// 	el.style.left = props.newCoords.left;
	// 	el.style.top = props.newCoords.top;
	// }


  componentDidUpdate(props) {
		// Ensure activeElement stays highlighted if active

		if (this.state.isActive) {

			try {
				document.getElementById(this.props.activeElement.id).classList.add('active');
			} catch (e) {
				// catch error
			}

		}

  }


	componentWillUpdate(newProps) {
		// Ensure proper dehighlighting when deselecting an element

		if ((newProps.activeElement.id === 'noneSelected') && (this.props.activeElement.id !== 'noneSelected')) {

			try {
				document.getElementById(this.props.activeElement.id).classList.remove('active');
			} catch (e) {
				// Selected Element has been Deleted
			}

		}
	}


	setValue(e) {
		// Handles value updates for the active element

		// Panel must have a data-type attribute
		if (!e.target.getAttribute('data-type')) {
			return;
		}

		let state = this.props;
		let val = e.target.value;
		let field = e.target.getAttribute('data-type');

		[field, val] = determineVal(field, state, val, e);

		// Ensure content value doesn't collapse
		if (val === '') {
			val = ' ';
		}

		this.props.editElement(this.props.activeElement, {[field]:val});
	}



  render() {
		// Renders panels if active

		let state = this.props;

		let name = ''
		let text = ''
		let children = ''
		let deleteButton = ''
		let colors = ''
		let layout = ''
		let align = ''
		let width = ''
		let height = ''
		let position = ''
		let border = ''
		let shadows = ''
		let fontFam = '';
		let fontSize = '';
		let imgUrl = '';
		let imgFit = '';



		if (this.state.isActive) {

			name = this.getNameSect(state);
			text = this.getTextSect(state);
			children = this.getChildren(state);
			deleteButton = this.getDelBut(this.state);
			colors = this.getColorSect(state);
			layout = this.getLayoutSect(state);
			align = this.getAlignSect(state);
			width = this.getWidthSect(state);
			height = this.getHeightSect(state);
			position = this.getPositionSect(state);
			border = this.getBorderSect(state);
			shadows = this.getShadowSect(state);
			fontFam = this.getFontFamSect(state);
			fontSize = this.getFontSizeSect(state);
			imgUrl = this.getUrlSect(state);
			imgFit = this.getImgFitSect(state);

			document.getElementById(state.activeElement.id).classList.add('active')
		}

    return (
      <section id="editPanelContainer">
				<div id="editPanel" className='editor'>
					<h5 id="edit-type">{state.activeElement.type}</h5>
					{name}
					{position}
					{layout}
					{align}
					{text}
					{children}
					{width}
					{height}
					{colors}
					{border}
					{shadows}
					{fontFam}
					{fontSize}
					{imgUrl}
					{imgFit}
					{deleteButton}
				</div>

      </section>
    );
  }
}
