import { CATEGORY_FILTER, ROOM_FILTER } from "./types";

export const roomFilter = (value) => {
  return { type: ROOM_FILTER, value };
};

export const typeFilter = (value) => {
  return { type: CATEGORY_FILTER, value };
};
