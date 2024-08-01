import axios from "axios";
import { API_URLS } from "../constants/Apiurls";

export const FETCH_USER_DATA = "FETCH_USER_DATA";
export const FETCH_DATA_SUCCESS = "FETCH_DATA_SUCCESS";
export const FETCH_DATA_FAILURE = "FETCH_DATA_FAILURE";

export const fetchDataRequest = () => ({
  type: FETCH_USER_DATA,
});

export const fetchDataSuccess = (data) => ({
  type: FETCH_DATA_SUCCESS,
  payload: data,
});

export const fetchDataFailure = (error) => ({
  type: FETCH_DATA_FAILURE,
  payload: error,
});

export const fetchData = (page) => {
  return (dispatch) => {
    dispatch(fetchDataRequest());
    const url = page ? `${API_URLS.user.FETCH_USER}?page=${page}`: `${API_URLS.user.FETCH_USER}`;
    axios
      .get(url)
      .then((response) => {
        const data = response.data;
        dispatch(fetchDataSuccess(data));
      })
      .catch((error) => {
        dispatch(fetchDataFailure(error.message));
      });
  };
};
