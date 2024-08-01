import { combineReducers } from 'redux';
import tabReducer from './tabReducer';
import userReducer from './apireducers'; 
import batchReducer from './batchReducer'; 
import trainingReducer from './trainingReducer';

const rootReducer = combineReducers({
    tab : tabReducer,
    userdata: userReducer,
    batchdata:batchReducer,
    addbatchdata :batchReducer,
    trainingsdata : trainingReducer
});

export default rootReducer;