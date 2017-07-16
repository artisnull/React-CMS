/*
Filename: determineDefaults.js
Author: Zach Lambert
Last Updated: 17 Apr 2017
Description: Method to determine Img default classes and tags, depending on
type
 */

const determineDefaults = (type, initClasses) => {
	/*
		Determines the tag and default className for an element of a given type
	 */
	let classes, tag;

	switch (type.toLowerCase()) {

		case 'paragraph':

		// Don't add the initClasses if the element already has them
			if (!initClasses.includes('content')) {
				classes = 'content paragraph ' + initClasses;
			} else classes = initClasses;

			tag = 'p';
		break;

		case 'headline':

		// Don't add the initClasses if the element already has them
			if (!initClasses.includes('content')) {
				classes = 'content headline ' + initClasses;
			} else classes = initClasses;

			tag = 'span';
		break;

		case 'label':

		// Don't add the initClasses if the element already has them
			if (!initClasses.includes('content')) {
				classes = 'content label ' + initClasses;
			} else classes = initClasses;

			tag = 'span';
		break;

	}

	return [classes, tag];
}

export default determineDefaults;
