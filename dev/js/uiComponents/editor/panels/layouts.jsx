/*
Filename: layouts.jsx
Author: Zach Lambert
Last Updated: 17 Apr 2017
Description: Panel for selecting layout and alignment
 */

import React from 'react';
import extractVal from '../../../methods/extractVal.js'


const layArr = ['layout_row', 'layout_column'];

// Icon array maps the layout class to the google material-icons icon class
const layIcon = {
	'layout_row' : 'view_stream',
	'layout_column' : 'view_column'
};

const alignArr = ['align_horiz_left', 'align_horiz_center', 'align_horiz_right'];
const alignVertArr = ['align_vert_top', 'align_vert_middle', 'align_vert_bottom'];

// Icon array maps the alignment class to the google material-icons icon class
const alignIcon = {
	'align_horiz_left' : 'format_align_left',
	'align_horiz_center' : 'format_align_center',
	'align_horiz_right' : 'format_align_right',
	'align_vert_bottom' : 'vertical_align_bottom',
	'align_vert_middle' : 'vertical_align_center',
	'align_vert_top' : 'vertical_align_top',
};

export const getLayoutSect = function(state) {
	// Builds and returns panel for selecting layout

	this.hydrateLayouts = hydrateLayouts.bind(this);

	// For editpanel, manipulate obj called state to match creatorpanel
	if ((state.activeElement != null) && (state.activeElement.id !== '')) {

		state = Object.assign({}, state.activeElement);
		state.layout = extractVal('layout', state.className);
	}

	let isContainer = /spacer|section|page$/;

	// Only containers get this panel
	if (isContainer.test(state.type.toLowerCase())) {

		return (
			<div className='editor layoutSect'>
				<span>Layout</span>
				<div>
					{this.hydrateLayouts(state)}
				</div>
			</div>
		)
	}

}

export const getAlignSect = function(state) {
	// Builds and returns panel for selecting horiz, vert, and text alignment

	this.hydrateAlign = hydrateAlign.bind(this);
	this.hydrateAlignVert = hydrateAlignVert.bind(this);

	// For editpanel, manipulate obj called state to match creatorpanel
	if ((state.activeElement != null) && (state.activeElement.id !== '')) {

		state = Object.assign({}, state.activeElement);
		state.align = extractVal('align_horiz', state.className);
		state['align-vert'] = extractVal('align_vert', state.className);
	}

	let isText = /paragraph|headline|label$/;
	let isContainer = /spacer|section|page$/;

	// If text, only allow text-align
	if (isText.test(state.type.toLowerCase())) {

		return (
			<div className='editor alignSect'>
				<span>Align</span>
				<div className='align-group'>
					{this.hydrateAlign(state)}	</div>
				</div>
		)

		// Is a container, allow all options
	} else if (isContainer.test(state.type.toLowerCase())){

		return (
			<div className='editor alignSect'>
				<span>Align</span>
				<div className='align-group'>
					{this.hydrateAlign(state)}
				</div>
				<div className='align-group'>
					{this.hydrateAlignVert(state)}
				</div>
			</div>
		)
	}
}



const hydrateLayouts = function(state) {
	// Builds and returns options for layout

	let thisLayout;
	let icon;

	return layArr.map((layout)=>{

		// make selected layout active
		if (state.layout === layout) {
			thisLayout = layout + '-choice active-layout-choice';
		} else {
			thisLayout = 'inactive-layout-choice ' + layout + '-choice';
		}

		return(
			<div key={layout} data-type='layout' data-value={layout} className={'layout-choice ' + thisLayout} onClick={(e)=>this.setValue(e)}><i className="material-icons">{layIcon[layout]}</i></div>
		)
	})
}

const hydrateAlign = function(state) {
	// Builds and returns options for horizontal and text alignment

	let thisAlign;
	let icon;

	return alignArr.map((align)=>{

		// make selected alignment active
		if (state.align === align) {
			thisAlign = align + '-choice active-align-choice';
		} else {
			thisAlign = 'inactive-align-choice ' + align + '-choice';
		}

		return(
			<div key={align} data-type='align' data-value={align} className={'align-choice ' + thisAlign} onClick={(e)=>this.setValue(e)}><i className="material-icons">{alignIcon[align]}</i></div>
		)
	})
}

const hydrateAlignVert = function(state) {
	// Builds and returns options for vertical alignment

	let thisLayout;
	let icon;

	return alignVertArr.map((layout)=>{

		// make selected alignment active
		if (state['align-vert'] === layout) {
			thisLayout = layout + '-choice active-align-vert-choice';
		} else {
			thisLayout = 'inactive-align-vert-choice ' + layout + '-choice';
		}

		return(
			<div key={layout} data-type='align-vert' data-value={layout} className={'align-choice ' + thisLayout} onClick={(e)=>this.setValue(e)}><i className="material-icons">{alignIcon[layout]}</i></div>
		)
	})
}
