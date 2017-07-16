/*
Filename: imageComponent.jsx
Author: Zach Lambert
Last Updated: 17 Apr 2017
Description: UI Element for Img, updates when the correlating img
in the collection has changed. Gets props from store
 */
import React from 'react';

export default class ImgComponent extends React.Component{

  render() {

		if (this.props.deleted === true) {
			return null;
		}

    return (
			<div data-element={this.props.ownData.type} id={this.props.ownData.id} className={this.props.ownData.className} name={this.props.ownData.name} data-id={this.props.ownData.dataID}>
				<img src={`${this.props.ownData.url}`} alt=""/>
			</div>
    );
  }

}
