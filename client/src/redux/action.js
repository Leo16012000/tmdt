import { ROOM_FILTER ,CATEGORY_FILTER ,PRICE_FILTER } from "./types";

export const roomFilter = (value) => {
  return { type: ROOM_FILTER, value };
};


export const categoryFilter = (value) => {
  return { type: CATEGORY_FILTER, value };
};

export const priceFilter = (lower , upper) => {
  return { type: PRICE_FILTER, lower , upper  };
};