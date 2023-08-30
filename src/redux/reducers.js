import { ActionTypes } from "./actions";

const initialState = {
  currentUser: null,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.LOGIN:
      return { ...state, currentUser: action.payload };
    case ActionTypes.LOGOUT:
      return { ...state, currentUser: null };
    case ActionTypes.REORDER_PREFERENCES:
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          iceCreamPreferences: action.payload,
        },
      };
    case ActionTypes.INITIALIZE_PREFERENCES:
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          iceCreamPreferences: action.payload,
        },
      };
    default:
      return state;
  }
};

export default rootReducer;
