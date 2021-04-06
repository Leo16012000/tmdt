import { ROOM_FILTER } from "./types";

export const roomFilter = (value) => {
  return { type: ROOM_FILTER, value };
};
