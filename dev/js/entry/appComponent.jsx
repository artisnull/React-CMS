/*
Filename: appComponent.jsx
Author: Zach Lambert
Last Updated: 17 Apr 2017
Description: Entry point for app, initializes store
Children: Home, Editor, ClickCatcher
 */

import React from 'react';
import ReactDom from 'react-dom';
import {Provider} from 'react-redux';
import {createStore} from 'redux';

import {aggReducer} from '../store/reducers/aggReducer.js';


import ClickCatcher from '../nonUiComponents/clickCatcher/clickCatcher.jsx';
import {Home, Editor} from '../uiComponents/uiRoster.js'



export default class App extends React.Component{

  render(){

		// Initialize store
		let store = createStore(aggReducer);

    return (
			<Provider store = {store}>
				<div>
					<Home />
					<Editor />
					<ClickCatcher />
				</div>
			</Provider>
		);
  }
}

// If browser, render our React app into the #app DOM element
if( typeof window !== 'undefined'){
  ReactDom.render(( <App />), document.getElementById('app'));
}
