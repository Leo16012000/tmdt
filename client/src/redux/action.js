import { ROOM_FILTER ,CATEGORY_FILTER ,PRICE_FILTER , SEARCH_FILTER} from "./types";

export const roomFilter = (value) => {
  return { type: ROOM_FILTER, value };
};


export const categoryFilter = (value) => {
  return { type: CATEGORY_FILTER, value };
};

export const priceFilter = (lower , upper) => {
  return { type: PRICE_FILTER, lower , upper  };
};

export const searchFilter = (keyword) => {
  return { type: SEARCH_FILTER, keyword  };
};