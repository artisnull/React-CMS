/*
Filename: hydrateFonts.js
Author: Zach Lambert
Last Updated: 17 Apr 2017
Description: Uses fetch to get the list of available fonts from Google Fonts API,
returns the object with full info, and an array of just the font names.
 */

import 'whatwg-fetch';

const hydrateFonts = function() {

	let fontNames = [];

	return new Promise((resolve, reject)=> {

		// GET the google fonts api
		initFonts(fontNames).then((response) => {

			if (response.status > 299) {
				throw new Error(response.message)
			}
			// Convert to JSON
			return response.json();

		}).then((data) =>{

			// Get the full object from the response
			let fontList = data.items;

			// Make an array of just the family names
			for (let i = 0; i < fontList.length; i++) {

				fontNames.push(fontList[i].family);
			}


			resolve([fontList, fontNames]);

		}).catch((error) =>{
			// Error!
			reject(error)
			console.log(error);
		});
	});
}
export default hydrateFonts;

const apiUrl = 'https://www.googleapis.com/webfonts/v1/webfonts?sort=alpha&key=AIzaSyB8ywHzS4DgtM8quRG2CQdK5ZtHBPmXGyo';

const initFonts = function(fontNames) {

	// GET the Google Fonts API and expose promise
	return fetch(apiUrl,
		{
      method: 'GET',
      headers: {},

    });

}
