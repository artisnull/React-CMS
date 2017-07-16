/*
Filename: aggReducer.js (aggregate reducer)
Author: Zach Lambert
Last Updated: 17 Apr 2017
Description: Combines all reducers into one
 */
import {combineReducers} from "redux";

import {activeElemReducer} from '../reducers/activeElemReducer.js';
import {posEditReducer} from '../reducers/posEditReducer.js';
import {parSelectToggReducer, parentClickReducer} from '../reducers/parentSelectReducer.js';
import {elemCollReducer} from '../reducers/elementCollection.js';
import {fontReducer} from '../reducers/fontReducer.js';

export const aggReducer = combineReducers({
	activeElemReducer,
	elemCollReducer,
	parSelectToggReducer,
	parentClickReducer,
	posEditReducer,
	fontReducer
});
