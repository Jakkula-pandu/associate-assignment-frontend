import { FETCH_USER_ASSESSMENT_DATA, 
    FETCH_USER_ASSESSMENT_SUCCESS, 
    FETCH_USER_ASSESSMENT_FAILURE
 } from "../actionTypes/userAssessmentsActionTypes";
  
  const initialState = {
    loading: false,
    userAssessments: [],
    error: "",
  };
  
  const userAssessmentReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_USER_ASSESSMENT_DATA:
        return {
          ...state,
          loading: true,
        };
      case FETCH_USER_ASSESSMENT_SUCCESS:
        return {
          ...state,
          loading: false,
          userAssessments: action.payload,
          error: "",
        };
      case FETCH_USER_ASSESSMENT_FAILURE:
        return {
          ...state,
          loading: false,
          userAssessments: [],
          error: action.payload,
        };   
      default:
        return state;
    }
  };
  
  export default userAssessmentReducer;
  