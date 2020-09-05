import { combineReducers } from 'redux';
import appReducer from './app';
import errorsReducer from './errors';

export default combineReducers({
	app: appReducer,
	error: errorsReducer,
});