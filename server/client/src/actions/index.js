import axios from "axios";
import { FETCH_USERS } from "./types";

export const fetchUser = () => {
  return function (dispatch) {
    axios.get("/api/current_user").then((res) =>
      dispatch({
        type: FETCH_USERS,
        payload: res,
      })
    );
  };
};
