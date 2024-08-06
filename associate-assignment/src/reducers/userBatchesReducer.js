import { FETCH_USER_BATCH_DATA, 
    FETCH_USER_BATCH_SUCCESS, 
    FETCH_USER_BATCH_FAILURE
  } from "../actionTypes/userBatchsActionTypes";
  
  const initialState = {
    loading: false,
    userBatches: [],
    error: "",
  };
  
  const userBatchReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_USER_BATCH_DATA:
        return {
          ...state,
          loading: true,
        };
      case FETCH_USER_BATCH_SUCCESS:
        return {
          ...state,
          loading: false,
          userBatches: action.payload,
          error: "",
        };
      case FETCH_USER_BATCH_FAILURE:
        return {
          ...state,
          loading: false,
          userBatches: [],
          error: action.payload,
        };   
      default:
        return state;
    }
  };
  
  export default userBatchReducer;
  