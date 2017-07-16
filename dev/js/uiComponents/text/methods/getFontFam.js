/*
Filename: getFontFam.js
Author: Zach Lambert
Last Updated: 17 Apr 2017
Description: Intelligently parses and loads the desired fontFamily and fontWeight,
using promises and WebFontloader
 */

import extractVal from '../../../methods/extractVal.js';
import hydrateFonts from '../../../methods/font/hydrateFonts.js';

export const getFontFam = function(props) {

		// Get desired fontWeight and fontFamily
		let	fontFamily = extractVal('ff_', props.ownData.className).substring(3).replace(/-/g, ' ');
		let	fontWeight = extractVal('fw_', props.ownData.className).substring(3);


		// These may not be hydrated at render time
		let fontArr = props.fontArr;
		let fontObj = props.fontObj;

		// If the props font array hasn't been hydrated, do it ourselves
		if (fontArr.length < 1) {

			// hydrateFonts gives us the fontlist object, and an array of font names
			return 	hydrateFonts().then(([fObj, fArr])=>{

				fontArr = fArr;
				fontObj = fObj;

				// find index of current font
				let fIndex = fontArr.indexOf(fontFamily);

				/*
				Get all the possible variants and if our desired weight is not
				 allowed, set weight to regular
				*/
				let weightArr = fontObj[fIndex].variants;
				if (weightArr.indexOf(fontWeight) < 0) {
					fontWeight = 'regular'
				}

				return loadFont(fontFamily, fontWeight)

			});
		}
			//========================================================
			// The array has been hydrated, proceed as usual
			//
			// find index of current font
			let fIndex = fontArr.indexOf(fontFamily);

			/*
			Get all the possible variants and if our desired weight is not
			 allowed, set weight to regular
			*/
			let weightArr = fontObj[fIndex].variants;
			if (weightArr.indexOf(fontWeight) < 0) {
				fontWeight = 'regular'
			}

			return loadFont(fontFamily, fontWeight)

	}

	export default getFontFam;

	const loadFont = function(fontFamily, fontWeight) {

		// Wrap webfont loader in promise so we can async resolve on 'active'
		return new Promise(function(resolve, reject) {

			WebFont.load({
				google: {
					families: [`${fontFamily}:${fontWeight}`]
				},

				classes: false,
				fontactive: (ff)=>{

					resolve(fontFamily);
				}
			});

		});
	}
