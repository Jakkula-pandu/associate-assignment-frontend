import { FETCH_USER_DATA, FETCH_DATA_SUCCESS, FETCH_DATA_FAILURE } from '../actionTypes/useractionstypes';

const initialState = {
  loading: false,
  users: [],
  error: ''
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER_DATA:
      return {
        ...state,
        loading: true
      };
    case FETCH_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload,
        error: ''
      };
    case FETCH_DATA_FAILURE:
      return {
        ...state,
        loading: false,
        users: [],
        error: action.payload
      };
    default:
      return state;
  }
};
export default userReducer


