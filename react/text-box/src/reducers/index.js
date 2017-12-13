import {combineReducers} from 'redux';
import textbox from './textboxReducer';

const rootReducer = combineReducers({
    textbox,
});

export default rootReducer;
