/*
Filename: elementCollection.js
Author: Zach Lambert
Last Updated: 17 Apr 2017
Description: Handles the state of the collection

elemCollReducer: pages, sections, spacers, paragraphs, headlines, labels, imgs
 */

import {recDelete} from '../../methods/reducers/reducerHelpers.js'

// Initial State if empty
const defState = {
	pages: {
		byId: {},
		allIds: [],
	},

	sections: {
		byId: {},
		allIds: [],
	},

	spacers: {
		byId: {},
		allIds: [],
	},

	paragraphs: {
		byId: {},
		allIds: [],
	},

	headlines: {
		byId: {},
		allIds: [],
	},

	labels: {
		byId: {},
		allIds: [],
	},

	imgs: {
		byId: {},
		allIds: [],
	},
};

// Initialize state to collection stored in localStorage or, if empty, defState
const getInitalState = function() {

	let initState = defState;

	if (localStorage != undefined) {

		if (localStorage.initColl == undefined) {
			saveState(defState)
		}

		initState = JSON.parse(localStorage.initColl);
	}

	return initState;
}

// Save new collection into localStorage
const saveState = function(newState) {

	if (localStorage != undefined) {

		localStorage.setItem('initColl', JSON.stringify(newState));
	}
}

export const elemCollReducer = (state = getInitalState(), action) => {

	switch (action.type) {
		/*
			Receives a new element to add the the document collection
			* Updates children
			Returns new document collection with added element
		*/
		case 'ADD_ELEM':
		{
			const el = action.element
			switch (el.type) {
				case 'page':
				// For Pages: No Parent
				let s = Object.assign({},  state, {
					[el.type.toLowerCase() + 's'] : {
						byId: Object.assign({}, state[el.type.toLowerCase() + 's']['byId'], {
							[el.id] : el
						}),
						allIds: state[el.type.toLowerCase() + 's']['allIds'].concat(el.id),
						// allIds: Object.assign([], state[el.type.toLowerCase() + 's']['allIds'], state[el.type.toLowerCase() + 's']['allIds'].push(el.id)),
					}
				});

				saveState(s);
				return s;

				break;
				default:
				// For subcontent: Must address parent
				// Add id to children array of parent
				const parent = el.parent;

					// Add self-reference in parent
					let pState = Object.assign({}, state, {
						[parent.type.toLowerCase() + 's'] : {
							byId: Object.assign({}, state[parent.type.toLowerCase() + 's']['byId'], {
								[parent.id] : Object.assign({}, state[parent.type.toLowerCase() + 's']['byId'][parent.id], {
									children: state[parent.type.toLowerCase() + 's']['byId'][parent.id].children.concat( {id: el.id, type: el.type}),
								}),
							}),
							allIds: Object.assign([], state[parent.type.toLowerCase() + 's']['allIds']),
						}
					});

					// Add self to collection
					let fullState = Object.assign({},  pState, {
						[el.type.toLowerCase() + 's'] : {
							byId: Object.assign({}, pState[el.type.toLowerCase() + 's']['byId'], {
								[el.id] : el
							}),
							allIds: pState[el.type.toLowerCase() + 's']['allIds'].concat(el.id),
						}
					});

					saveState(fullState);
					return fullState;

				break;
			}

		}
		break;

		/*
			Receives the id and type of the tree to remove
			* Deletes Children of element
			* Finds parent and removes self from children
			Returns new document collection without element(s)
		*/
		case 'REMOVE_ELEM':
		{
			const el = action.element
			// Copy state
			let ns = Object.assign({}, state);

			// Recursively delete element & children
			let ne = recDelete(el, ns);

			saveState(ne);
			return ne;
		}
		break;

		/*
			Receives id and type of element to edit, and content to update
			** Note that adding a child to an existing element is not an edit **
			Returns new document collection with updated elements
		*/
		case 'EDIT_ELEM':

			const el = action.element;

			// Check if new content...
			let a = state[el.type.toLowerCase() + 's'].byId[el.id];
			let b = el.edits;

			// If no values are different, don't update!
			for (var attr in b) {
				if ((a.hasOwnProperty(attr) && b.hasOwnProperty(attr)) && (a[attr] === b[attr])) {
					console.log('SAME', attr);
					delete el.edits[attr]
				}
			}

			if (Object.keys(el.edits).length === 0) {
				console.log('empty edit');
				return state;
			}

			// Return new object
			let s = Object.assign({},  state, {
				[el.type.toLowerCase() + 's'] : {
					byId: Object.assign({}, state[el.type.toLowerCase() + 's']['byId'], {
						// Let the edits overwrite state as copied to new object
						[el.id] : Object.assign({}, state[el.type.toLowerCase() + 's']['byId'][el.id], el.edits)
					}),
					allIds: state[el.type.toLowerCase() + 's']['allIds'],
				}
			});
			saveState(s);
		return s;
		break;


		default:
			return state;
	}
}
