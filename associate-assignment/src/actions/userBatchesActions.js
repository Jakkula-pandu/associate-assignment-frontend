import axios from "axios";
import { API_URLS } from "../constants/Apiurls";
import { FETCH_USER_BATCH_DATA, 
    FETCH_USER_BATCH_SUCCESS, 
    FETCH_USER_BATCH_FAILURE
 } from "../actionTypes/userBatchsActionTypes";

export const fetchUsersBatchRequest = () => ({
  type: FETCH_USER_BATCH_DATA,
});

export const fetchUsersBatchSuccess = (data) => ({
  type: FETCH_USER_BATCH_SUCCESS,
  payload: data,
});

export const fetchUsersBatchFailure = (error) => ({
  type: FETCH_USER_BATCH_FAILURE,
  payload: error,
});

export const fetchUsersBatch = (userId = 15 ) => {
  return (dispatch) => {
    dispatch(fetchUsersBatchRequest());
    axios
      .get(`${API_URLS.USER_BATCHES.FETCH_USER_BATCH}?user_id=${userId}`) 
      .then((response) => {
        const assessmentData = response.data;
        dispatch(fetchUsersBatchSuccess(assessmentData));
      })
      .catch((error) => {
        dispatch(fetchUsersBatchFailure(error.message));
      });
  };
};