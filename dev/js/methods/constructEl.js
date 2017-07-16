/*
Filename: constructEl.js
Author: Zach Lambert
Last Updated: 17 Apr 2017
Description: Passed an element object, returns new object based on type of element
 */
import {Container, Text, Img} from '../uiComponents/objRoster.js';


const constructEl = (element) => {
// Construct object based on element type

	switch (element.type.toLowerCase()) {

		case 'page':
		case 'section':
		case 'spacer':

			return new Container(element);

		break;

		case 'paragraph':
		case 'headline':
		case 'label':

		return new Text(element)

		break;

		case 'img':

		return new Img(element)

		break;

	}
}
export default constructEl;
