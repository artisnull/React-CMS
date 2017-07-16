/*
Filename: deleteButton.jsx
Author: Zach Lambert
Last Updated: 17 Apr 2017
Description: UI Component to delete the active element
 */
import React from 'react'

export const getDelBut = function (state) {
	// Only render when element has been selected

		if (state.isActive) {
			return (
				<div className='button-holder'><button className='editor' onClick={this.deleteEl}><i className="material-icons">delete</i></button></div>
			)
		}
	}
