/*
Filename: name.jsx
Author: Zach Lambert
Last Updated: 17 Apr 2017
Description: Panel for editing name of activeElement
 */

import React from 'react';

export const getNameSect = function(state) {

	return (
		<div data-type='name' className="panel-container" >
			<span>Name: </span>
			<input data-type='name' type="text" value={state.activeElement.name} onChange={(e)=>this.setValue(e)}/>
		</div>
	)
}
