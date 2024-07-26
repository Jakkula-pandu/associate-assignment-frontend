import axios from 'axios';
import { API_URLS } from '../constants/Apiurls';
import { FETCH_USER_DATA,FETCH_DATA_FAILURE,FETCH_DATA_SUCCESS } from '../actionTypes/useractionstypes';


export const fetchDataRequest = () => ({
  type: FETCH_USER_DATA
});

export const fetchDataSuccess = (data) => ({
  type: FETCH_DATA_SUCCESS,
  payload: data
});

export const fetchDataFailure = (error) => ({
  type: FETCH_DATA_FAILURE,
  payload: error
});



export const fetchData = () => {
  return (dispatch) => {
    dispatch(fetchDataRequest());
    axios.get(`${API_URLS.USER.FETCH_USER}`)
      .then(response => {
        const data = response.data;
        console.log("response>>>>>>lll", data);
        dispatch(fetchDataSuccess(data));
      })
      .catch(error => {
        dispatch(fetchDataFailure(error.message));
      });
  };
};


