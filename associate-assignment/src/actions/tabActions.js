import { SELECT_TAB } from "../actionTypes/tabActionTypes";

export const selectTab = (tab) => ({
  type: SELECT_TAB,
  payload: tab,
});