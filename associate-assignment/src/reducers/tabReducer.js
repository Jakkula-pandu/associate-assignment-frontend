
import { SELECT_TAB } from "../actionTypes/tabActionTypes";

const initialState = {
  selectedTab: 'Batches',
};

const tabReducer = (state = initialState, action) => {
  switch (action.type) {
    case SELECT_TAB:
      return { ...state, selectedTab: action.payload };
    default:
      return state;
  }
};

export default tabReducer;
