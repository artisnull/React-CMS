/*
Filename: posEditMethods.js
Author: Zach Lambert
Last Updated: 17 Apr 2017
Description: Methods to add handlers and update props with new position of selected element
during posEdit mode
 */

import React from 'react';


export const editPos = function() {
	// Start posEdit mode

	this.startMove = startMove.bind(this);
	this.endMove = endMove.bind(this);
	this.moving = moving.bind(this);

	// First, disable activeElement selection
	this.removeClickHandler();

	// Then add event handlers for moving the element
	let el = document.getElementById(this.props.activeElement.id);

	el.addEventListener('mousedown', this.startMove);
	el.addEventListener('mouseup', this.endMove);
}


export const endPosEdit = function() {
	// Stop posEdit mode, remove all handlers and classes

	let el = document.getElementById(this.props.activeElement.id);

	el.removeEventListener('mousedown', this.startMove);
	el.removeEventListener('mousemove', this.moving);
	el.removeEventListener('mouseup', this.endMove);

	el.classList.remove('material-icons');
	el.classList.remove('active-pos-edit');

	this.addClickHandler();

	document.getElementById('editPanel').classList.remove('seethru');

}


const startMove = function() {
	// Triggered on mousedown, when in posEdit mode

	let el = document.getElementById(this.props.activeElement.id);

	el.addEventListener('mousemove', this.moving);
}


const endMove = function() {
	//  Triggered on mouseup, when in posEdit mode

	let el = document.getElementById(this.props.activeElement.id);

	let left = parseInt(el.style.left);
	let top = parseInt(el.style.top);

	el.removeEventListener('mousemove', this.moving);

	// Update props with new position
	this.props.updatePos({left, top});
}


const moving = function(e) {
	// Triggered while holding mousedown and moving mouse, when in posEdit mode

	let el = document.getElementById(this.props.activeElement.id);

	// For nested components, subtract coordinates of parent
	let parCoords = el.parentNode.getBoundingClientRect();
	let parX = parCoords.left;
	let parY = parCoords.top;

	let l = e.clientX - parX - el.clientWidth/2 + 'px';
	let t = e.clientY - parY - el.clientHeight/2 + 'px';

	// Update position of element
	el.style.left = l;
	el.style.top = t;
}
