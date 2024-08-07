import axios from "axios";
import { API_URLS } from "../constants/Apiurls";
import { FETCH_USER_EXAM_QUESTIONS_DATA, FETCH_USER_EXAM_QUESTIONS_SUCCESS, FETCH_USER_EXAM_QUESTIONS_FAILURE } from "../actionTypes/userExamQuestionActionTypes";

export const fetchUserExamQuestionRequest = () => ({
  type: FETCH_USER_EXAM_QUESTIONS_DATA,
});

export const fetchUserExamQuestionsSuccess = (data) => ({
  type: FETCH_USER_EXAM_QUESTIONS_SUCCESS,
  payload: data,
});

export const fetchUserExamQuestionsFailure = (error) => ({
  type: FETCH_USER_EXAM_QUESTIONS_FAILURE,
  payload: error,
});

export const fetchUserExamQuestions = ( assessmentId, page= 1 ) => {
  return (dispatch) => {
    dispatch(fetchUserExamQuestionRequest());
    axios
      .get(`${API_URLS.USER_EXAM_QUESTIONS.FETCH_USER_EXAM_QUESTIONS}?assessment_id=${assessmentId}&page=${page}`) 
      .then((response) => {
        const userExamQuestions = response.data;       
        dispatch(fetchUserExamQuestionsSuccess(userExamQuestions));
      })
      .catch((error) => {
        dispatch(fetchUserExamQuestionsFailure(error.message));
      });
  };
};