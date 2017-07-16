/*
Filename: creatorPanel.jsx
Author: Zach Lambert
Last Updated: 17 Apr 2017
Description: UI for CreatorPanel, shows panels and creates new element
 */

import React from 'react';

import {Text, Img, Container} from '../../../../objRoster.js'

import {getColorSect, getRandomColor, getParentSect, getTextSect, getLayoutSect, getAlignSect, getWidthSect, getHeightSect, getUrlSect, getImgFitSect} from '../../../panels/roster.js'

import createElement from '../methods/createElement.js'

export default class CreatorPanel extends React.Component{

  constructor() {
    super();

    this.state = {
			type: 'Section',
			parent:'',
			content: '',
			url: '',
			fontColor: 'font-black',
			backColor: 'back-' + getRandomColor(),
			layout: 'layout_row',
			align: 'align_horiz_left',
			'align-vert': 'align_vert_middle',
			'size-width': 'size-width-50',
			'size-height': 'size-height-50',
			pos: 'pos-relative',
			coords: 'coord__',
			'bor-width': 'bor-width-0',
			'bor-color': 'bor-color-white',
			'sha-lvl': 'sha-lvl-0',
			'fs' : 'fs_12',
			'ff' : 'ff_Heebo',
			'fw' : 'fw_regular',
			'img-fit' : 'img_fit_cover'
    };
		this.state.name = 'Default ' + this.state.type;

		this.closeCreator = this.closeCreator.bind(this);
		this.setValue = this.setValue.bind(this);
		this.createElement = createElement.bind(this);

		this.getTextSect = getTextSect.bind(this);
		this.getColorSect = getColorSect.bind(this);
		this.getParentSect = getParentSect.bind(this);
		this.getLayoutSect = getLayoutSect.bind(this);
		this.getAlignSect = getAlignSect.bind(this);
		this.getWidthSect = getWidthSect.bind(this);
		this.getHeightSect = getHeightSect.bind(this);
		this.getUrlSect = getUrlSect.bind(this);
		this.getImgFitSect = getImgFitSect.bind(this);
  }


	componentWillReceiveProps(props) {
		// Update state if a parent has been selected

		if (props.activeParent.id != null) {

			this.setState({parent: {
				id: props.activeParent.id,
				type: props.activeParent.type,
			}})

		}
	}


	closeCreator() {
		// Close the creatorPanel

		this.props.closeCreator();
	}


	setValue(e) {
		// Updates the state with the user choice

		// Copy state so we don't mutate
		let state = Object.assign({}, this.state);

		let type = e.target.getAttribute('data-type');
		let value = e.target.value;

		// Some options aren't traditional form elements, and don't have a value
		// In these cases, use data-value instead
		if ((type === 'align') || (type === 'layout') || (type === 'align-vert') || (type === 'fontColor') || (type === 'backColor')) {

			value = e.target.getAttribute('data-value');
		}

		state[type] = value;

		// Make default name 'Default {ElementType}'
		if ((type === 'type') && (state.name.substring(0,7) === 'Default')) {
			state.name = 'Default ' + state.type;
		}

		this.setState(state);
	}


  render(){
		let state = this.state;

		// All the possible panels
		let parentChooser = this.getParentSect(state);
		let textChooser = this.getTextSect(state);
		let layoutChooser = this.getLayoutSect(state);
		let alignChooser = this.getAlignSect(state);
		let colorChooser = this.getColorSect(state);
		let widthChooser = this.getWidthSect(state);
		let heightChooser = this.getHeightSect(state);
		let urlChooser = this.getUrlSect(state);
		let imgFitChooser = this.getImgFitSect(state);

    return (
			<div className='editor' id="creatorPanel">
				<div id="creator" className='editor'>
					<h3>NEW ELEMENT</h3>
					<span>Type: </span>
					<select id='elSel' data-type='type' value={state.type} onChange={(e) => this.setValue(e)}>
						<optgroup label='Containers'>
							<option value="Page">Page</option>
							<option value="Section">Section</option>
							<option value="Spacer">Spacer</option>
						</optgroup>
						<optgroup label='Text'>
							<option value="Paragraph">Paragraph</option>
							<option value="Headline">Headline</option>
							<option value="Label">Label</option>
						</optgroup>
						<optgroup label='Image'>
							<option value="Img">Image</option>
						</optgroup>
					</select>
					<span>Name: </span>
					<input type="text" data-type='name' value={state.name} onChange={(e) => this.setValue(e)}/>
					{parentChooser}
					{textChooser}
					{colorChooser}
					{layoutChooser}
					{alignChooser}
					{widthChooser}
					{heightChooser}
					{urlChooser}
					{imgFitChooser}
					<div className="creatorButtons editor">
						<button className='font-red' onClick={this.closeCreator}><i className="material-icons font-red">close</i></button>
						<button className='font-green' onClick={this.createElement}><i className="material-icons font-green">check</i></button>
					</div>
				</div>
			</div>
		);
  }
}
