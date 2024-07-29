import {
    FETCH_TRAINING_DATA,
    FETCH_TRAINING_SUCCESS,
    FETCH_TRAINING_FAILURE,
  
  } from "../actionTypes/trainingActionTypes";
  
  const initialState = {
    loading: false,
    trainings: [],
    error: "",
  };
  
  const trainingReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_TRAINING_DATA:
        return {
          ...state,
          loading: true,
        };
      case  FETCH_TRAINING_SUCCESS:
        return {
          ...state,
          loading: false,
          trainings: action.payload,
          error: "",
        };
      case FETCH_TRAINING_FAILURE:
        return {
          ...state,
          loading: false,
          trainings: [],
          error: action.payload,
        };
        default:
            return state;
    }
  };
  
  export default trainingReducer;
  