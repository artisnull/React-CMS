/*
Filename: creator.jsx
Author: Zach Lambert
Last Updated: 17 Apr 2017
Description: UI Container for CreatorPanel, shows and hides CreatorPanel
 */

import React from 'react';

import CreatorPanel from '../mainPanel/store/creatorPanel-container.js';

export default class Creator extends React.Component{

  constructor() {
    super();
    this.state = {
			showCreator: false,
    };

		this.showCreator = this.showCreator.bind(this);
		this.closeCreator = this.closeCreator.bind(this);

  }

	showCreator() {
		// Hide editPanel and show creatorPanel

		this.props.resetActive();
		this.setState({showCreator: true})
	}

	closeCreator() {
		// Ensure parentSelect is off, hide creatorPanel

		this.props.disableParentSelect();
		this.props.resetParentSelect();
		document.getElementById('creatorPanel').classList.remove('seethru');
		this.setState({showCreator: false});
	}

  render(){
		let state = this.state;

		let panel = state.showCreator? <CreatorPanel closeCreator={this.closeCreator}/> : '';

    return (
				<div id="creatorContainer">
					{panel}
					<div id="creatorButCont">
						<button className='editor sha-lvl-4' id="creatorBut" onClick={this.showCreator}><i className="material-icons">add</i></button>
					</div>
				</div>
		);
  }
}
