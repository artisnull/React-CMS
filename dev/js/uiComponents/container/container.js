/*
Filename: container.js
Author: Zach Lambert
Last Updated: 17 Apr 2017
Description: Object definition for Container. Includes prototypal definitions
and methods. Usage to ensure same data structure for all components and to
expose the toComponent() method, which returns a React component.
 */

import React from 'react';

import Element from '../../nonUiComponents/elementProto/element.js';
import ContainerComponent from './store/container-container.js';
import determineDefaults from './methods/determineDefaults.js';

// Default if no arguments are passed
const defElement = {
	name: 'default',
	type: 'page',
	children: [],
	tag: 'section',
	className: 'container page full-screen',
	parent: ''
};

export default function Container(element = defElement) {

	// Create element with default state and/or state passed as param
	element = Object.assign({}, defElement, element);

	// Ensure element has necessary tag and className for its type.
	[element.className, element.tag] = determineDefaults(element.type, element.className);

	// Build core element data
	let commonData = Element.call(this, element.id, element.dataID, element.name, element.tag);

	// Assign attributes
	this.type = element.type;
	this.children = element.children;
	this.className = element.className;
	this.parent = element.parent;

	// Method to allow easy structured access to element data, in array form for easy destructuring
	this.toArr = () =>{
		return [{...commonData}, {dataElement: this.type, className:this.className, dataParent: this.parent}, this.children]
	}
}

// Inherits from Element
Container.prototype = new Element();
Container.prototype.constructor = Container;

Container.prototype.toComponent = function() {
	// Method to create React component from the element

	let [properties, initialAttr, children] = this.toArr();
	let key = properties.dataID;

	return <ContainerComponent {...properties} {...initialAttr} key={key} children={children}/>
}
