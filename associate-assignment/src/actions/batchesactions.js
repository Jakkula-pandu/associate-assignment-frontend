import axios from "axios";
import { API_URLS } from "../constants/Apiurls";
import {
  FETCH_BATCH_DATA,
  FETCH_BATCH_SUCCESS,
  FETCH_BATCH_FAILURE,
  ADD_BATCH_REQUEST,
  ADD_BATCH_SUCCESS,
  ADD_BATCH_FAILURE,
} from "../actionTypes/batchActionTypes";

export const fetchBatchRequest = () => ({
  type: FETCH_BATCH_DATA,
});

export const fetchBatchSuccess = (data) => ({
  type: FETCH_BATCH_SUCCESS,
  payload: data,
});

export const fetchBatchFailure = (error) => ({
  type: FETCH_BATCH_FAILURE,
  payload: error,
});

export const fetchBatch = () => {
  return (dispatch) => {
    dispatch(fetchBatchRequest());
    axios
      .get(`${API_URLS.BATCH.FETCH_BATCH}`)
      .then((response) => {
        const batchData = response.data.Batches;
        dispatch(fetchBatchSuccess(batchData));
      })
      .catch((error) => {
        dispatch(fetchBatchFailure(error.message));
      });
  };
};

// Action Creators
export const addBatchRequest = () => ({
  type: ADD_BATCH_REQUEST,
});

export const addBatchSuccess = (data) => ({
  type: ADD_BATCH_SUCCESS,
  payload: data,
});

export const addBatchFailure = (error) => ({
  type: ADD_BATCH_FAILURE,
  payload: error,
});

// Thunk for adding a batch
export const addBatch = (batchData) => {
  return (dispatch) => {
    dispatch(addBatchRequest());
    axios
      .post(`${API_URLS.BATCH.ADD_BATCH}`, batchData)
      .then((response) => {
        const addedBatch = response.data;
        dispatch(addBatchSuccess(addedBatch));
      })
      .catch((error) => {
        dispatch(addBatchFailure(error.message));
      });
  };
};
