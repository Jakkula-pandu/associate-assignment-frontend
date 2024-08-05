import {
    FETCH_ASSESSMENT_DATA,
    FETCH_ASSESSMENT_SUCCESS,
    FETCH_ASSESSMENT_FAILURE,
    ADD_ASSESSMENT_REQUEST,
    ADD_ASSESSMENT_SUCCESS,
    ADD_ASSESSMENT_FAILURE,
  } from "../actionTypes/assessmentActionTypes";
  
  const initialState = {
    loading: false,
    assessments: [],
    error: "",
  };
  
  const assessmentReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_ASSESSMENT_DATA:
        return {
          ...state,
          loading: true,
        };
      case FETCH_ASSESSMENT_SUCCESS:
        return {
          ...state,
          loading: false,
          assessments: action.payload,
          error: "",
        };
      case FETCH_ASSESSMENT_FAILURE:
        return {
          ...state,
          loading: false,
          assessments: [],
          error: action.payload,
        };
      case ADD_ASSESSMENT_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case ADD_ASSESSMENT_SUCCESS:
        return {
          ...state,
          loading: false,
          batches: [...state.batches, action.payload],
          error: "",
        };
      case ADD_ASSESSMENT_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default assessmentReducer;
  