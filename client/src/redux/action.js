import {
  CATEGORY_FILTER,
  ROOM_FILTER,
  PRICE_FILTER,
  UPDATE_USER,
  SEARCH_FILTER,
} from "./types";

export const roomFilter = (value) => {
  return { type: ROOM_FILTER, value };
};

export const updateUser = (
  email,
  displayName,
  phoneNumber,
  photoUrl,
  verify
) => {
  return {
    type: UPDATE_USER,
    payload: { email, displayName, phoneNumber, photoUrl, verify },
  };
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
