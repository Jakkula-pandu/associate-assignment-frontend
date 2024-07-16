import { combineReducers } from 'redux';
// import offcanvasReducer from './formModalReducers';
import tabReducer from './tabReducer';

const rootReducer = combineReducers({
//   offcanvas: offcanvasReducer,
    tab : tabReducer,
});

export default rootReducer;