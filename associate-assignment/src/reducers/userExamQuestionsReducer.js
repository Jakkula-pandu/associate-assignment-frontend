import { 
    FETCH_USER_EXAM_QUESTIONS_DATA, 
    FETCH_USER_EXAM_QUESTIONS_SUCCESS, 
    FETCH_USER_EXAM_QUESTIONS_FAILURE 
} from "../actionTypes/userExamQuestionActionTypes";
  
  const initialState = {
    loading: false,
    userExamQuestions: [],
    error: "",
  };
  
  const userExamQuestionsReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_USER_EXAM_QUESTIONS_DATA:
        return {
          ...state,
          loading: true,
        };
      case FETCH_USER_EXAM_QUESTIONS_SUCCESS:
        return {
          ...state,
          loading: false,
          userExamQuestions: action.payload,
          error: "",
        };
      case FETCH_USER_EXAM_QUESTIONS_FAILURE:
        return {
          ...state,
          loading: false,
          userExamQuestions: [],
          error: action.payload,
        };   
      default:
        return state;
    }
  };
  
  export default userExamQuestionsReducer;
  