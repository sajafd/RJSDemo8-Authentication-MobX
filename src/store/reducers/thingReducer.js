import * as actionTypes from "../actions/actionTypes";

const initialState = {
  things: [],
  privateThings: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_THINGS:
      return {
        ...state,
        things: action.payload
      };

    case actionTypes.GET_PRIVATE_THINGS:
      return {
        ...state,
        privateThings: action.payload
      };

    default:
      return state;
  }
};

export default reducer;
