import axios from "axios";
import { FETCH_USERS } from "./types";

export const fetchUser = () => async (dispatch) => {
  const res = await axios.get("/api/current_user");
  dispatch({
    type: FETCH_USERS,
    payload: res.data,
  });
};

export const handleToken = (token) => async (dispatch) => {
  const res = await axios.post("/api/stripe", token);

  dispatch({
    type: FETCH_USERS,
    payload: res.data,
  });
};

export const submitSurvey = (values) => {
  return { type: "submit_survey" };
};
