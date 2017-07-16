/*
Filename: children.jsx
Author: Zach Lambert
Last Updated: 17 Apr 2017
Description: Renders selectable and drag and droppable list of children elements
of the active element
 */

import React from 'react'

export const getChildren = function(state) {
	// Renders selectable and drag and droppable list of children elements

	if ((state.activeElement.children !== '') && (state.activeElement.children !== undefined)) {

		return (
			<div className="panel-container">
				<span>Children: </span>

				{/* For each child in the list, map UI and dropzones */}
				{state.activeElement.children.map((child, index, arr) => {

					// dzt = dropzone target
					let dzt = <div onDragOver={(e)=>{this.handleDragOver(e)}} data-drop={index} onDrop={(e)=>{this.handleDrop(e)}} onDragEnter={(e)=>{this.handleDragEnter(e)}} onDragLeave={(e)=>{this.handleDragLeave(e)}} className='children-landing'></div>
					let name = document.getElementById(child.id).getAttribute('name');

					return (
						/* For the first child only, also put a dropzone above the child,
						otherwise just below */
						<div key={child.id}>
							{index < 1 ? dzt : ''}

							<div data-target={child.id} data-index={index} draggable='true'  onDragStart={(e)=>{this.handleDragStart(e)}} onDragEnd={(e)=>{this.handleDragEnd(e)}} className='editor edit-children' >
								<i className="material-icons">reorder</i>
								<a data-target={child.id} onClick={(e)=>{this.selectActiveFromMenu(e.target)}}>{name}</a>
							</div>

							<div onDragOver={(e)=>{this.handleDragOver(e)}} data-drop={index + 1} onDrop={(e)=>{this.handleDrop(e)}} onDragEnter={(e)=>{this.handleDragEnter(e)}} onDragLeave={(e)=>{this.handleDragLeave(e)}} className='children-landing'></div>
						</div>
					)
				})}

			</div>
		)
	}

}
