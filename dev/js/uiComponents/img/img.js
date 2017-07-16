/*
Filename: img.js
Author: Zach Lambert
Last Updated: 17 Apr 2017
Description: Object definition for Img. Includes prototypal definitions
and methods. Usage to ensure same data structure for all components and to
expose the toComponent() method, which returns a React component.
 */

import React from 'react';
import Element from '../../nonUiComponents/elementProto/element.js';
import ImgComponent from './store/img-container.js';
import determineDefaults from './methods/determineDefaults.js';

// Default if no arguments are passed
const defElement = {
	name: 'default',
	type: 'img',
	url: '',
	tag: 'img',
	className: 'content img img_fit_zcover',
	parent: '',
};

export default function Img(element = defElement) {

	// Create element with default state and/or state passed as param
	element = Object.assign({}, defElement, element);

	// Ensure element has necessary className
	this.className = determineDefaults(element.className);

	// Build core element data
	let commonData = Element.call(this, element.id, element.dataID, element.name, element.tag);

	// Assign attributes
	this.type = element.type;
	this.url = element.url;
	this.parent = element.parent;

	// Method to allow easy structured access to element data, in array form for easy destructuring
	this.toArr = () =>{
		return [{...commonData}, {dataElement: this.type, className:this.className, dataParent: this.parent}, this.url]
	}
}


// Inherits from Element
Img.prototype = new Element();
Img.prototype.constructor = Img;


Img.prototype.toComponent = function() {
	// Method to create React component from the element

	let [properties, initialAttr, url] = this.toArr();
	let key = properties.dataID;

	return <ImgComponent {...properties} {...initialAttr} key={key} url={url}/>
}
