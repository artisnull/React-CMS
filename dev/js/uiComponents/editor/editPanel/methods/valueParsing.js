/*
Filename: valueParsing.js
Author: Zach Lambert
Last Updated: 17 Apr 2017
Description: Methods to setup and parse the field and value for element editing
 */

export const determineVal = function(field, state, val, e) {
	// Depending on the data field, update val with that in state, or pass through

	switch (field) {

		case 'backColor':
			field = 'className';
			val = updateVal('back-', state, e);
		break;

		case 'fontColor':
			field = 'className';
			val = updateVal('font-', state, e);
		break;

		case 'layout':
			field = 'className';
			val = updateVal('layout', state, e);
		break;

		case 'align':
			field = 'className';
			val = updateVal('align_horiz', state, e);
		break;

		case 'align-vert':
			field = 'className';
			val = updateVal('align_vert', state, e);
		break;

		case 'size-width':
			field = 'className';
			val = updateVal('size-width', state, e);
		break;

		case 'size-height':
			field = 'className';
			val = updateVal('size-height', state, e);
		break;

		case 'pos':
			field = 'className';

			// Set back to default
			let el = document.getElementById(state.activeElement.id);
			el.style.left = '';
			el.style.top = '';

			val = updateVal('pos-', state, e);
		break;

		case 'coord':
			field = 'className';
			val = updateVal('coord', state, e);
		break;

		case 'bor-color':
			field = 'className';
			val = updateVal('bor-color', state, e);
		break;

		case 'bor-width':
			field = 'className';
			val = updateVal('bor-width', state, e);
		break;

		case 'sha-lvl':
			field = 'className';
			val = updateVal('sha-lvl', state, e);
		break;

		case 'font-family':
			field = 'className';
			val = updateVal('ff_', state, e);
		break;

		case 'font-size':
			field = 'className';
			val = updateVal('fs_', state, e);
		break;

		case 'font-weight':
			field = 'className';
			val = updateVal('fw_', state, e);
		break;

		case 'img-fit':
			field = 'className';
			val = updateVal('img_fit_', state, e);
		break;

	}

	return [field, val];
}


const updateVal = function(type, state, e) {
	/*
	Matches the string 'type' in state.activeElement.className, replaces with new value,
	then rebuilds and returns the className string
	*/

	let cN = state.activeElement.className;

	let classes = cN.split(' ');

	for (let i = 0; i < classes.length; i++) {

		// Find current class value
		if (classes[i].includes(type)) {
			// Update class value
			let val = e.target.value ? e.target.value : e.target.getAttribute('data-value');
			classes[i] = val;
		}

	}

	// Rebuild className string
	cN = classes.reduce((prev, curr) => {
		return prev + ' ' + curr;
	});

	return cN;
}
