import { combineReducers } from 'redux';
import tabReducer from './tabReducer';
import userReducer from './apireducers';
import batchReducer from './batchreducer'; 


const rootReducer = combineReducers({
    tab : tabReducer,
    userdata: userReducer,
    batchdata:batchReducer,
    addbatchdata :batchReducer


});

export default rootReducer;