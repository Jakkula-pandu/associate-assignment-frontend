import axios from "axios";
import { API_URLS } from "../constants/Apiurls";
import {
    FETCH_TRAINING_DATA,
    FETCH_TRAINING_SUCCESS,
    FETCH_TRAINING_FAILURE, 
  } from "../actionTypes/TrainingActionTypes";

  export const fetchTrainingRequest = () => ({
    type: FETCH_TRAINING_DATA,
  });
  
  export const fetchTrainingSuccess = (data) => ({
    type: FETCH_TRAINING_SUCCESS,
    payload: data,
  });
  
  export const fetchTrainingFailure = (error) => ({
    type: FETCH_TRAINING_FAILURE,
    payload: error,
  });
  
  export const fetchTraining = () => {
    return (dispatch) => {
      dispatch(fetchTrainingRequest());
      axios
        .get(`${API_URLS.TRAINING.FETCH_TRAINING}`)
        .then((response) => {
          const trainingData = response.data;
          dispatch(fetchTrainingSuccess(trainingData));
        })
        .catch((error) => {
          dispatch(fetchTrainingFailure(error.message));
        });
    };
  };