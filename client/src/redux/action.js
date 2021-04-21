import { CATEGORY_FILTER, ROOM_FILTER, PRICE_FILTER } from "./types";

export const roomFilter = (value) => {
  return { type: ROOM_FILTER, value };
};

export const categoryFilter = (value) => {
  return { type: CATEGORY_FILTER, value };
};

export const handlePriceFilter = (value) => {
  return { type: PRICE_FILTER, value };
};
