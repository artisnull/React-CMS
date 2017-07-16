/*
Filename: container.jsx
Author: Zach Lambert
Last Updated: 17 Apr 2017
Description: UI Element for Container, updates when the correlating container
in the collection has changed. Parses classname for coordinates when absolutely
positioned.
 */
import React from 'react';

import extractCoord from '../methods/extractCoord.js';
import constructEl from '../../../methods/constructEl.js';

export default class Container extends React.Component{

  componentDidUpdate() {
		// Ensure that component stays highlighted if active while updating
		if (this.props.id === this.props.activeElement.id) {
			document.getElementById(this.props.id).classList.add('active')
		}
  }

	shouldComponentUpdate(newProps) {
		// Determines if component will update

		let shouldUpdate = false;

		// If this component has been deleted in the collection, update
		if (newProps.deleted) {
			return shouldUpdate = true;
		}

		/*
		Check each data item from this element in the collection to see if it's changed
		and if so, update
	 */

		for (var prop in newProps.ownData) {
			if (newProps.ownData.hasOwnProperty(prop)) {

				if ((newProps.ownData[prop] !== this.props.ownData[prop])) {
					return shouldUpdate = true;
				}
			}
		}

		// Updates if true
		return shouldUpdate;
	}


  render() {

		// If element in collection has been deleted, render nothing
		if (this.props.deleted === true) {
			return null;
		}

		let ownProps = this.props.ownData;

		/*
			For each child that this element has, construct an object of its type,
			then call toComponent() and add to our children array.
		 */

		let childArr = [];

		if (this.props.childData != null) {
			for (let child of this.props.childData) {

				if (child != null) {
					let obj = constructEl(child);
					let c = obj.toComponent(true)
					childArr.push(c);
				}

			}
		}

		const children = childArr.map((child) => {
			return child
		});

	/*
		If the component is absolutely positioned, get the coordinates from the className
		and set the inline style
	 */
		let xPos ='';
		let yPos = '';
		let style = {};

		if (ownProps.className.includes('pos-absolute')) {
			[xPos, yPos] = extractCoord(ownProps.className)
			style = {left: xPos + 'px', top: yPos + 'px'}
		}

    return (
			<ownProps.tag data-element={ownProps.type} style={style} id={ownProps.id} className={ownProps.className} name={ownProps.name} data-id={ownProps.dataID}>
				{children}
			</ownProps.tag>
    );
  }

}
