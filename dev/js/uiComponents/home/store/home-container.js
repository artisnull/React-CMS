/*
Filename: home-container.js
Author: Zach Lambert
Last Updated: 17 Apr 2017
Description: Connects Home to store.
Props: pages, pList
PropMethods: none
 */

import React from 'react';
import {connect} from 'react-redux';

import Home from '../ui/home.jsx';

const mapStatetoProps = (state) => {

	let coll = state.elemCollReducer;

	return {
		pages: coll.pages,
		pList: coll.pages.allIds,
	}
}

const mapDispatchToProps = (dispatch) => {

	return {}
}

export default connect(mapStatetoProps, mapDispatchToProps)(Home);
