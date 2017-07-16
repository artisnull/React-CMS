/*
Filename: collection-actions.js
Author: Zach Lambert
Last Updated: 17 Apr 2017
Description: Actions to change collection state

corresponds with: elemCollReducer
 */

export const addToCollection = (element) => {
	// Format and add new element to collection
	return {
		type: 'ADD_ELEM',
		element : formatElement(element)
	}
}
export const removeFromCollection = (element) => {
	// Format and remove element from collection
	return {
		type: 'REMOVE_ELEM',
		element : simplifyElement(element)
	}
}
export const editElement = (element, edits) => {
	// Format and edit existing element in collection
	return {
		type: 'EDIT_ELEM',
		element : simplifyForEdit(element, edits)
	}
}


const formatElement = (element) => {
	// Ensures element is fit for adding to collection

	let elObj = {
		id: element.id,
		dataID: element.dataID,
		type: element.type.toLowerCase(),
		tag: element.tag,
		name: element.name,
		className: element.className,
	}

	switch (element.type.toLowerCase()) {

		case 'page':

		 	elObj.children = [];
		break;

		case 'section':
		case 'spacer':

		elObj.children = [];
		elObj.parent = {
			id: element.parent.id,
			type: element.parent.type
		};
		break;

		case 'paragraph':
		case 'headline':
		case 'label':

		elObj.content = element.content;
		elObj.parent = {
			id: element.parent.id,
			type: element.parent.type
		};
		break;

		case 'img':

		elObj.url = element.url;
		elObj.parent = {
			id: element.parent.id,
			type: element.parent.type
		};
		break;
	}

	return elObj;
}

const simplifyElement = (element) => {
	// Only type and id are needed to identify and delete an element
	return {
		type: element.type,
		id: element.id
	}
}

const simplifyForEdit = (element, edits) => {
	// Only type, id, and the edits are needed to edit an element
	return {
		type: element.type,
		id: element.id,
		edits: edits,
	}
}
