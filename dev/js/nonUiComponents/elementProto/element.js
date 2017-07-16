/*
Filename: element.js
Author: Zach Lambert
Last Updated: 17 Apr 2017
Description: Object definition for Element. Includes prototypal definitions
and methods. It is the abstract parent for containers, imgs, text components.
 */
import shortId from 'shortid';

export default function Element(id, dataID, name = 'default', tag = 'div') {
	// Element Constructor
	// Id and dataId are random strings
	let iv, dv;

	// Generate a new id, or use the existing one if it's not null
	if ((id == null) || (dataID == null)) {
		iv = shortId.generate();
		dv = shortId.generate();
	} else {
		iv = id;
		dv = dataID
	}

	Object.defineProperty(this, 'id', {value: iv, enumerable:true});
	Object.defineProperty(this, 'dataID', {value: dv, enumerable:true});

	tag = String(tag).toLowerCase();

	Object.defineProperty(this, 'tag', {value: tag, enumerable:true});

	this.name = String(name);
	return {name:this.name,tag:this.tag,id:this.id,dataID:this.dataID}
};
