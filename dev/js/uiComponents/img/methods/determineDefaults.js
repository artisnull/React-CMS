/*
Filename: determineDefaults.js
Author: Zach Lambert
Last Updated: 17 Apr 2017
Description: Method to ensure img elems have necessary default classes
 */

const determineDefaults = (initClasses) => {
	/*
		Determines default className for an img element
	 */
	let classes;

	// Don't add the initClasses if the element already has them
	if (!initClasses.includes('content')) {
		classes = 'content img ' + initClasses;
	} else classes = initClasses;


	return classes;
}

export default determineDefaults;
