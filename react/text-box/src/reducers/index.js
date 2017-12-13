import {combineReducers} from 'redux';
import textbox from './textboxReducer';
import {isDebugMode} from 'store/config';

const rootReducer = combineReducers({
    textbox,
    debug: (state={isDebugMode}) => state
});

export default rootReducer;
