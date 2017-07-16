/*
Filename: determineDefaults.js
Author: Zach Lambert
Last Updated: 17 Apr 2017
Description: Method to determine Container default classes and tags, depending on
type
 */
const determineDefaults = (type, initClasses) => {
	/*
		Determines the tag and default className for an element of a given type
	 */
	let classes, tag;

	switch (type.toLowerCase()) {

		case 'page':
			// Don't add the initClasses if the element already has them
			if (!initClasses.includes('container')) {
				classes = 'container page full-screen ' + initClasses;
			} else classes = initClasses;
			tag = 'section';
		break;

		case 'section':
			// Don't add the initClasses if the element already has them
			if (!initClasses.includes('container')) {
				classes = 'container section ' + initClasses;
			} else classes = initClasses;

			tag = 'div';
		break;

		case 'spacer':
			// Don't add the initClasses if the element already has them
			if (!initClasses.includes('container')) {
				classes = 'container spacer ' + initClasses;
			} else classes = initClasses;

			tag = 'div';
		break;

	}

	return [classes, tag];
}

export default determineDefaults;
