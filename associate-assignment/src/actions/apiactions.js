import axios from 'axios';
import { API_URLS } from '../constants/Apiurls';

export const FETCH_USER_DATA = 'FETCH_USER_DATA';
export const FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS';
export const FETCH_DATA_FAILURE = 'FETCH_DATA_FAILURE';

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

export const fetchData = (page = 1) => {
  return (dispatch) => {
    dispatch(fetchDataRequest());
    axios.get(`${API_URLS.user.FETCH_USER}?page=${page}`)
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
