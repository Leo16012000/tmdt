import {
  CATEGORY_FILTER,
  ROOM_FILTER,
  PRICE_FILTER,
  UPDATE_USER,
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

export const handlePriceFilter = (value) => {
  return { type: PRICE_FILTER, value };
};
