import {
    ADD_QUESTIONS_REQUEST,
    ADD_QUESTIONS_SUCCESS,
    ADD_QUESTIONS_FAILURE,
  } from "../actionTypes/questionActionTypes";
  
  const initialState = {
    loading: false,
    questions: [],
    error: "",
  };
  
  const questionsReducer = (state = initialState, action) => {
    switch (action.type) {
      case ADD_QUESTIONS_REQUEST:
        
        return {
          ...state,
          loading: true,
        };
      case ADD_QUESTIONS_SUCCESS:
        return {
          ...state,
          loading: false,
          questions: [],
          error: "",
        };
      case ADD_QUESTIONS_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default questionsReducer;
  