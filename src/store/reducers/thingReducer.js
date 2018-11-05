import * as actionTypes from "../actions/actionTypes";

const initialState = {
  public: [],
  private: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_THINGS:
      return {
        ...state,
        public: action.payload
      };

    case actionTypes.GET_PRIVATE_THINGS:
      return {
        ...state,
        private: action.payload
      };

    default:
      return state;
  }
};

export default reducer;
