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
import TextComponent from './store/text-container.js';
import determineDefaults from './methods/determineDefaults.js';

const lorem = `Lorem ipsum dolor sit amet, consectetur adipisicing elit,
 sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
	 ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit
	  in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
		 sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
		  mollit anim id est laborum.`;

// Default if no arguments are passed
const defElement = {
	name: 'default',
	type: 'paragraph',
	content: lorem,
	tag: 'p',
	className: 'content paragraph',
	parent: '',
};

export default function Text(element = defElement) {

	// Create element with default state and/or state passed as param
	element = Object.assign({}, defElement, element);

	// Ensure content is not empty -> give default text
	if (element.content === '') {
		element.content = 'Default Text';
	}

	// Ensure element has necessary tag and className for its type.
	[element.className, element.tag] = determineDefaults(element.type, element.className);

	// Build core element data
	let commonData = Element.call(this, element.id, element.dataID, element.name, element.tag);

	// Assign attributes
	this.type = element.type;
	this.content = element.content;
	this.className = element.className;
	this.parent = element.parent;

	// Method to allow easy structured access to element data, in array form for easy destructuring
	this.toArr = () =>{
		return [{...commonData}, {dataElement: this.type, className:this.className, dataParent: this.parent}, this.content]
	}
}


// Inherits from Element
Text.prototype = new Element();
Text.prototype.constructor = Text;


Text.prototype.toComponent = function() {
	// Method to create React component from the element

	let [properties, initialAttr, content] = this.toArr();
	let key = properties.dataID;

	return <TextComponent {...properties} {...initialAttr} key={key} content={content}/>
}
