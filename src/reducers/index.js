import { combineReducers } from 'redux';
import wordReducer from './wordReducer';

export default combineReducers({
  words: wordReducer
});