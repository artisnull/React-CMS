/*
Filename: text.jsx
Author: Zach Lambert
Last Updated: 17 Apr 2017
Description: UI Element for Text, updates when the correlating Text
in the collection has changed. Parses classname for fontFamily and uses promises
and WebFont loader to dynamically load fonts from the GoogleFonts API.

***Note:
*Font family is held in state, so that it's only updated after WebFont
*has loaded the font. I.e -> Props Update -> Webfont loads -> setState -> render
*This way the fontFamily is loaded before render, and there is no FOUC
 */

import React from 'react';

import extractVal from '../../../methods/extractVal.js';
import getFontFam from '../methods/getFontFam.js';


export default class Text extends React.Component{

	constructor(props) {
		super(props);
		this.state = {
			ff: extractVal('ff_', props.className).substring(3).replace(/-/g, ' ')
		}
	}

  componentDidUpdate() {
		// Ensure that component stays highlighted if active while updating
		if (this.props.id === this.props.activeElement.id) {
			document.getElementById(this.props.id).classList.add('active')
		}
  }

  componentWillReceiveProps(newProps) {

		// Don't try to manipulate data if element has been deleted
		if (newProps.ownData == null) {
			return;
		}

		/*
			fontFamily is in form: ff_font-family
			fontWeight is in form: fw_num
			Extract previous and current values for comparison
			If different, use WebFont to get the new font
		 */

		let	oldFamily = extractVal('ff_', this.props.ownData.className).substring(3).replace(/-/g, ' ');
		let	newFamily = extractVal('ff_', newProps.ownData.className).substring(3).replace(/-/g, ' ');
		let	oldWeight = extractVal('fw_', this.props.ownData.className).substring(3);
		let	newWeight = extractVal('fw_', newProps.ownData.className).substring(3);

		if ((oldFamily!==newFamily) || (oldWeight!==newWeight)) {
			getFontFam(newProps).then((ff)=>{this.setState({ff}) }).catch((e)=>{console.log('err:',e);});
		}
  }

  componentWillMount() {
		// Before we've mounted, load the initial font so it's ready to go on render
		getFontFam(this.props).then((ff)=>{this.setState({ff}) }).catch((e)=>{console.log('err:',e);});
  }



  render() {

		if (this.props.deleted === true) {
			return null;
		}

		let style = {
			fontFamily :this.state.ff,
		};

    return (
			<div data-element={this.props.ownData.type} style={style} id={this.props.ownData.id} className={this.props.ownData.className} name={this.props.ownData.name} data-id={this.props.ownData.dataID}>
				<this.props.ownData.tag>
					{this.props.ownData.content}
				</this.props.ownData.tag>
			</div>
    );
  }

}
