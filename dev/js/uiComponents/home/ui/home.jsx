/*
Filename: home.jsx
Author: Zach Lambert
Last Updated: 17 Apr 2017
Description: Component to display any pages in the collection. Updates when pages
are added or removed.
Children: any pages in the collection
 */

import React from 'react';

import {Container} from '../../objRoster.js';


export default class Home extends React.Component{

  render() {

		let pages = this.props.pages;
		let pageList = this.props.pList;
		let els = [];

		/*
			Iterate through pages in collection and convert to Container Objects to ensure
			correct data structure, then call toComponent() on each one as it's rendered.
		 */

		for (let pageId of pageList) {
			if (pages.byId.hasOwnProperty(pageId)) {
				els.push( new Container(pages.byId[pageId]) );
			}
		}

		// call toComponent() on each page to convert to ui component

		const elList = els.map((el) => {
			return el.toComponent(true)
		});

    return (
      <section id="homeContainer">
				{elList}
      </section>
    );
  }
}
