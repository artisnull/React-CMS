/*
Filename: container.jsx
Author: Zach Lambert
Last Updated: 17 Apr 2017
Description: UI Element for Container, updates when the correlating container
in the collection has changed. Parses classname for coordinates when absolutely
positioned.
 */

const extractVal = function(type, cN) {

	let classes = cN.split(' ');
	let val = '';

	for (let i = 0; i < classes.length; i++) {
		if (classes[i].includes(type)) {
			val = classes[i];
		}
	}
	return val;
}

export default extractVal;
