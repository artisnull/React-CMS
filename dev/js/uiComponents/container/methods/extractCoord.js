/*
Filename: extractCoord.js
Author: Zach Lambert
Last Updated: 17 Apr 2017
Description: takes a classname String, parses and returns x,y coordinates
for positioning
 */

const extractCoord = function(cN) {
	// Takes classname, splits the string to get the Coordinates, returns x,y
	// Coordinates are in form 'coord_'xVal'_'yVal''

	let classes = cN.split(' ');
	let xPos, yPos;

	for (let i = 0; i < classes.length; i++) {
		if (classes[i].includes('coord_')) {
			let coords = classes[i].split('_');

			xPos = coords[1];
			yPos = coords[2];
		}
	}

	return [xPos, yPos];
}

export default extractCoord;
