import axios from "axios";
import * as actionTypes from "./actionTypes";

export const fetchGarbage = () => {
  return dispatch => {
    axios
      .get("https://precious-things.herokuapp.com/api/things/")
      .then(res => res.data)
      .then(things =>
        dispatch({
          type: actionTypes.GET_THINGS,
          payload: things
        })
      )
      .catch(err => console.error(err));
  };
};

export const fetchTreasure = () => {
  return dispatch => {
    axios
      .get("https://precious-things.herokuapp.com/api/private-things/")
      .then(res => res.data)
      .then(things =>
        dispatch({
          type: actionTypes.GET_PRIVATE_THINGS,
          payload: things
        })
      )
      .catch(err => console.error(err));
  };
};
