import axios from "axios";
import { API_URLS } from "../constants/Apiurls";
import { ADD_QUESTIONS_REQUEST,ADD_QUESTIONS_FAILURE,ADD_QUESTIONS_SUCCESS } from "../actionTypes/questionActionTypes";

export const addQuestionsRequest = () => ({
  type:  ADD_QUESTIONS_REQUEST,
});

export const addQuestionsSuccess = (data) => ({
  type: ADD_QUESTIONS_SUCCESS,
  payload: data,
});

export const addQuestionsFailure = (error) => ({
  type: ADD_QUESTIONS_FAILURE,
  payload: error,
});


export const addQuestions = (requestBody, assessmentName) => {
  return (dispatch) => {
    dispatch(addQuestionsRequest());
    return axios
        .post(`${API_URLS.QUESTIONS.ADD_QUESTION}`, requestBody, {
          headers: {
            'role_id': 2,
          },
          params :{
            'assessment_id' : assessmentName.value
          }
        })
        .then((response) => {
          const addedQuestions = response.data;
          dispatch(addQuestionsSuccess(addedQuestions));
          return(response);  
        })
        .catch((error) => {
          dispatch(addQuestionsFailure(error.message));
          throw(error);  
        });
  };
};


