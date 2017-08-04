import { combineReducers } from 'redux';
import refreshReducer from './refreshReducer.js';

// import * as types from '../actions/types';

export default combineReducers({
    data: refreshReducer,
});
