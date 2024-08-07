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
    let url = `${API_URLS.ASSESSMENT.FETCH_ASSESSMENT}`;
    const params = new URLSearchParams();
    if (page) {
      params.append('page', page);
    }
    if (search) {
      params.append('search', search);
    }
    if (page && page.batchName && page.batchName.value) {
      params.append('batch_id', page.batchName.value);
    }
    if (params.toString()) {
      url += `?${params.toString()}`;
    }
    axios.get(url)
      .then((response) => {
        const assessmentData = response.data;
        console.log("assessmentData",assessmentData);
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
    return axios
        .post(`${API_URLS.ASSESSMENT.ADD_ASSESSMENT}`, requestBody, {
          headers: {
            'role_id': 2,
            'batch_id': batchName.value,
          },
        })
        .then((response) => {
          const addedAssessment = response.data; 
          dispatch(addAssessmentSuccess(addedAssessment));
          return(response);  
        })
        .catch((error) => {
          dispatch(addAssessmentFailure(error.message));
          throw(error);  
        });
  };
};


