/*
Filename: dragDrop.js
Author: Zach Lambert
Last Updated: 17 Apr 2017
Description: Drag and drop methods for reordering children in editpanel
 */


export const handleDragStart = function(e) {
	// When dragging starts, identify dropzones and the index of the dragee

	e.dataTransfer.setData('text/plain', null);
	e.target.classList.add('drag-start');
	let index = Number(e.target.getAttribute('data-index'));
	let dropzones = document.getElementsByClassName('children-landing');

	// Add 'active-dropzone' to all dropzones but the ones that land on the current index
	for (let i = 0; i < dropzones.length; i++) {

		if ((i === index) || (i === index+1)) {
			// Don't add these dropzones -> they are the same as current
		} else {
			dropzones[i].classList.add('active-dropzone')
		}

	}

	// Update state with the index of our dragee
	let s = Object.assign({}, this.state);
	s.dragIndex = index;

	this.setState(s);
}


export const handleDragEnd = function(e) {
	// When dragging ends, remove all the classes we added when we started dragging

	e.target.classList.remove('drag-start');
	let dropzones = document.getElementsByClassName('children-landing');

	for (let i = 0; i < dropzones.length; i++) {
		dropzones[i].classList.remove('active-dropzone')
	}

}


export const handleDrop = function(e) {
	// When dropped, call changeChildOrder with our previous index and our next index

	e.preventDefault();

	let fromIndex = this.state.dragIndex;
	let toIndex = Number(e.target.getAttribute('data-drop'));

	// Double check to make sure we didn't land on the same index
	if ((toIndex === fromIndex) || (toIndex === fromIndex + 1)) {
		return
	}

	e.target.classList.remove('active');

	// Initiate the child reordering based on our prev and next indices
	this.changeChildOrder(fromIndex, toIndex);

}


export const handleDragEnter = function(e) {
	// When our dragged obj enters a landing zone, add the 'active' class

	e.preventDefault();

	let index = Number(e.target.getAttribute('data-drop'));

	// Don't add 'active' to current index dropzones
	if ((index === this.state.dragIndex) || (index === this.state.dragIndex + 1)) {
		return
	}

	e.target.classList.add('active');

}


export const handleDragOver = function(e) {
	// When the dragged obj is over a landing zone (necessary function for d+d functionality)

	e.preventDefault();
	e.dataTransfer.dropEffect = "move"
}


export const handleDragLeave = function(e) {
	// When dragged obj leaves dropzone, remove 'active'

	e.preventDefault();

	e.target.classList.remove('active');

}
