import axios from "axios";
import { API_URLS } from "../constants/Apiurls";
import { FETCH_USER_ASSESSMENT_DATA, 
    FETCH_USER_ASSESSMENT_SUCCESS, 
    FETCH_USER_ASSESSMENT_FAILURE
 } from "../actionTypes/userAssessmentsActionTypes";

export const fetchUsersAssessmentRequest = () => ({
  type: FETCH_USER_ASSESSMENT_DATA,
});

export const fetchUsersAssessmentSuccess = (data) => ({
  type: FETCH_USER_ASSESSMENT_SUCCESS,
  payload: data,
});

export const fetchUsersAssessmentFailure = (error) => ({
  type: FETCH_USER_ASSESSMENT_FAILURE,
  payload: error,
});

export const fetchUsersAssessment = (batchId ) => {
  return (dispatch) => {
    dispatch(fetchUsersAssessmentRequest());
    axios
      .get(`${API_URLS.USER_ASSESSMENT.FETCH_USER_ASSESSMENT}?batch_id=${batchId}`) 
      .then((response) => {
        const userAssessmentData = response.data;
        dispatch(fetchUsersAssessmentSuccess(userAssessmentData));
      })
      .catch((error) => {
        dispatch(fetchUsersAssessmentFailure(error.message));
      });
  };
};