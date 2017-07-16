/*
Filename: buildClass.js
Author: Zach Lambert
Last Updated: 17 Apr 2017
Description: Method to ensure element is created with the appropriate classes for
its type
 */


 const listOfTextClasses = ['fontColor', 'align', 'fs', 'ff', 'fw'];
 const listOfImgClasses = ['img-fit', 'sha-lvl'];
 const listOfContainerClasses = ['backColor', 'align', 'align-vert', 'layout', 'size-width', 'size-height', 'pos', 'coords', 'bor-width', 'bor-color', 'sha-lvl'];

export const buildClass = function (state) {
	// Using the arrays of keys, construct a string className according to type of element

	let isText = /paragraph|headline|label$/;
	let isContainer = /page|section|spacer$/;
	let isImg = /img$/;
	let cN;

	// Text
	if (isText.test(state.type.toLowerCase())) {

		cN = listOfTextClasses.reduce((prev, curr, index) => {
			if (index === 1) {
				return state[prev] + ' ' + state[curr];
			} else {
				return prev + ' ' + state[curr];
			}
		});

		// Container
	} else if(isContainer.test(state.type.toLowerCase())) {

		cN = listOfContainerClasses.reduce((prev, curr, index) => {
			if (index === 1) {
				return state[prev] + ' ' + state[curr];
			} else {
				return prev + ' ' + state[curr];
			}
		});

		// Img
	} else if (isImg.test(state.type.toLowerCase())) {

		cN = listOfImgClasses.reduce((prev, curr, index) => {
			if (index === 1) {
				return state[prev] + ' ' + state[curr];
			} else {
				return prev + ' ' + state[curr];
			}
		});

	}
	return cN;
}

export default buildClass;
