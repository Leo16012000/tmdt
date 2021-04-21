import { ROOM_FILTER, CATEGORY_FILTER, PRICE_FILTER } from "./types";

const initialState = {
  room: 0,
  category: 0,
};

const appReducer = (state = initialState, action) => {
  // { type, data...} process
  // process action
  switch (action.type) {
    case ROOM_FILTER: {
      return { ...state, room: action.value };
    }
    case CATEGORY_FILTER: {
      return { ...state, category: action.value };
    }
    case PRICE_FILTER: {
      return { ...state, price: action.value };
    }
    default:
      return state;
  }
};

export default appReducer;
// logger to print previsou state + new state
