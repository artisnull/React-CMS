/*
Filename: childOrder.js
Author: Zach Lambert
Last Updated: 17 Apr 2017
Description: Method to reorder children in editpanel
 */

const changeChildOrder = function(fromIndex, toIndex) {

	// Copy the children to a new array so we don't mutate
	let children = [...this.props.activeElement.children]

	// Get the elem at the prev index
	let fromEl = children[fromIndex];

	// Remove child from array
	children.splice(fromIndex, 1);

	// Adjust index for deletion if necessary
	if (fromIndex < toIndex) {
		toIndex--;
	}

	// Add the elem into the array at the new index
	children.splice(toIndex, 0, fromEl);

	// Update store with edited children array
	this.props.editElement(this.props.activeElement, {children});

}

export default changeChildOrder;
