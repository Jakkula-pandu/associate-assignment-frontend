import { combineReducers } from 'redux';
import tabReducer from './tabReducer';
import userReducer from './apireducers'; 

const rootReducer = combineReducers({
    tab : tabReducer,
    userdata: userReducer,
});

export default rootReducer;