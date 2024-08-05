import axios from "axios";
import { API_URLS } from "../constants/Apiurls";
import {
  FETCH_ASSESSMENT_DATA,
  FETCH_ASSESSMENT_SUCCESS,
  FETCH_ASSESSMENT_FAILURE,
  ADD_ASSESSMENT_REQUEST,
  ADD_ASSESSMENT_SUCCESS,
  ADD_ASSESSMENT_FAILURE,
} from "../actionTypes/assessmentActionTypes";

export const fetchAssessmentRequest = () => ({
  type: FETCH_ASSESSMENT_DATA,
});

export const fetchAssessmentSuccess = (data) => ({
  type: FETCH_ASSESSMENT_SUCCESS,
  payload: data,
});

export const fetchAssessmentFailure = (error) => ({
  type: FETCH_ASSESSMENT_FAILURE,
  payload: error,
});

export const fetchAssessment = (page, search) => {
  return (dispatch) => {
    dispatch(fetchAssessmentRequest());
    axios
      .get(`${API_URLS.ASSESSMENT.FETCH_ASSESSMENT}?page=${page} &search=${search}`)
      .then((response) => {
        const assessmentData = response.data;
        dispatch(fetchAssessmentSuccess(assessmentData));
      })
      .catch((error) => {
        dispatch(fetchAssessmentFailure(error.message));
      });
  };
};

export const addAssessmentRequest = () => ({
  type: ADD_ASSESSMENT_REQUEST,
});

export const addAssessmentSuccess = (data) => ({
  type: ADD_ASSESSMENT_SUCCESS,
  payload: data,
});

export const addAssessmentFailure = (error) => ({
  type: ADD_ASSESSMENT_FAILURE,
  payload: error,
});


export const addAssessment = (requestBody, batchName) => {

  return (dispatch) => {
    dispatch(addAssessmentRequest());
    axios
    .post(`${API_URLS.ASSESSMENT.ADD_ASSESSMENT}`, requestBody, {
      headers: {
        'role_id': 2,
        'batch_id' : batchName.value
      },
    })
      .then((response) => {
        dispatch(addAssessmentSuccess(response.data));
      })
      .catch((error) => {
        dispatch(addAssessmentFailure(error.message));
      });
  };
};




