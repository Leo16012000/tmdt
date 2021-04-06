import { ROOM_FILTER } from "./types";

const initialState = {
  room: undefined,
};

const appReducer = (state = initialState, action) => {
  // { type, data...} process
  // process action
  switch (action.type) {
    case ROOM_FILTER: {
      return { ...state, room: action.value };
    }
    default:
      return state;
  }
};

export default appReducer;
// logger to print previsou state + new state
