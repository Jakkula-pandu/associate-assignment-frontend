import {
    FETCH_BATCH_DATA,
    FETCH_BATCH_SUCCESS,
    FETCH_BATCH_FAILURE,
    ADD_BATCH_REQUEST,
    ADD_BATCH_SUCCESS,
    ADD_BATCH_FAILURE,
  } from "../actionTypes/batchActionTypes";
  
  const initialState = {
    loading: false,
    batches: [],
    error: "",
  };
  
  const batchReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_BATCH_DATA:
        return {
          ...state,
          loading: true,
        };
      case FETCH_BATCH_SUCCESS:
        return {
          ...state,
          loading: false,
          batches: action.payload,
          error: "",
        };
      case FETCH_BATCH_FAILURE:
        return {
          ...state,
          loading: false,
          batches: [],
          error: action.payload,
        };
      case ADD_BATCH_REQUEST:
        return {
          ...state,
          loading: true,
        };
        case ADD_BATCH_SUCCESS:
          console.log("ADD_BATCH_SUCCESS payload:", action.payload);
          return {
            ...state,
            loading: false,
            batches: [], 
            error: action.payload,
          };
          
      case ADD_BATCH_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default batchReducer;
  