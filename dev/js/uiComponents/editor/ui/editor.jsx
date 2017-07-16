/*
Filename: editor.jsx
Author: Zach Lambert
Last Updated: 17 Apr 2017
Description: Parent of Creator and Editor UI, shows the context buttons
during parentSelect and posEdit, hydrates the global font array
 */

import React from 'react';

import EditPanel from '../editPanel/store/editPanel-container.js';
import Creator from '../creator/store/creator-container.js';
import hydrateFonts from '../../../methods/font/hydrateFonts.js';


export default class Editor extends React.Component{
  constructor() {
    super();

		this.cancelParentSelect = this.cancelParentSelect.bind(this);
		this.cancelPosEdit = this.cancelPosEdit.bind(this);
		this.confirmPosEdit = this.confirmPosEdit.bind(this);
  }


  componentWillMount() {
		hydrateFonts().then(([fontObj, fontArr])=>{
			this.props.setFontList(fontObj, fontArr);
		});
  }

	cancelParentSelect() {
		this.props.resetParentSelect();
		this.props.disableParentSelect();
	}

	cancelPosEdit() {
		this.props.resetPos();
	}

	confirmPosEdit() {
		this.props.disablePosEdit();
	}



  render(){

		let ctxtBtn = '';
		// Display cancel button during parentSelect
		if (this.props.parentSelectOn) {
			ctxtBtn = (
				<div className='editor' id="editContextButtonContainer">
					<button className="editCtxtBtn" onClick={this.cancelParentSelect}>
						<i className="material-icons">cancel</i>
					</button>
				</div>
			)
		} else if (this.props.posEditOn) {
			// Display cancel and confirm buttons during posEdit
			ctxtBtn = (
				<div className='editor' id="editContextButtonContainer">
					<button className="editCtxtBtn" onClick={this.cancelPosEdit}>
						<i className="material-icons">cancel</i>
					</button>
					<button className="editCtxtBtn" onClick={this.confirmPosEdit}>
						<i className="material-icons">check</i>
					</button>
				</div>
			)
		}

    return (
				<div id="editContainer">
					<EditPanel />
					<Creator />
					{ctxtBtn}
				</div>
		);
  }
}
