/*
Filename: reducerHelpers.js
Author: Zach Lambert
Last Updated: 17 Apr 2017
Description: Methods to assist a reducer process
 */

export const recDelete = (el, ns) => {
	// Recursively delete an element and its children

	// If not a page, Get parent element
	// console.log(ns);
	if (el.type.toLowerCase() !== 'page') {

		let parent = ns[el.type.toLowerCase() + 's'].byId[el.id].parent;

		// Find this el in children array and delete
		let pChildren = ns[parent.type.toLowerCase() + 's'].byId[parent.id].children;
		// Test id's of array elements
		let i =pChildren.findIndex((item)=>{return (item.id === el.id)});
		pChildren.splice(i, 1);

		// Create new array from pChildren
		ns[parent.type.toLowerCase() + 's'].byId[parent.id].children = Object.assign([],pChildren);
		ns = Object.assign({}, ns);
	}

	// Get children
	if ((el.type.toLowerCase() === 'page') || (el.type.toLowerCase() === 'section')) {

		let children =  ns[el.type.toLowerCase() + 's'].byId[el.id].children;
		if (children != null) {
			// recDelete each child
			while (children.length > 0) {
				ns = recDelete(children[0], ns);
				// Update children to newest version
				children =  ns[el.type.toLowerCase() + 's'].byId[el.id].children;
			}
		}
	}

	// Delete el from it's section
	delete ns[el.type.toLowerCase() + 's'].byId[el.id];
	ns[el.type.toLowerCase() + 's'].byId = Object.assign({}, ns[el.type.toLowerCase() + 's'].byId);


	// Get allIds array
	let allIds = ns[el.type.toLowerCase() + 's'].allIds;
	// Find and delete el id from array
	let index = allIds.indexOf(el.id);
	allIds.splice(index, 1);

	ns[el.type.toLowerCase() + 's'].allIds = Object.assign([],allIds);
	// Return new object
	return Object.assign({}, ns);
}
