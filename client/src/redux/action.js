import {
  CATEGORY_FILTER,
  ROOM_FILTER,
  PRICE_FILTER,
  UPDATE_USER,
  SEARCH_FILTER,
  INCREASE_QUANTITY,
  DECREASE_QUANTITY,
  ADD_CART,
  REMOVE_CART,
  QUANTITY_MODIFIER,
  SEND_ORDER_INFO,
  RESET_CART,
} from "./types";

export const roomFilter = (value) => {
  return { type: ROOM_FILTER, value };
};

export const updateUser = (
  email,
  displayName,
  phoneNumber,
  photoUrl,
  address,
  verify
) => {
  return {
    type: UPDATE_USER,
    payload: { email, displayName, phoneNumber, photoUrl, address, verify },
  };
};

export const categoryFilter = (value) => {
  return { type: CATEGORY_FILTER, value };
};

export const priceFilter = (lower, upper) => {
  return { type: PRICE_FILTER, lower, upper };
};

export const searchFilter = (value) => {
  return { type: SEARCH_FILTER, value };
};

export const increaseQuantity = (index) => {
  return { type: INCREASE_QUANTITY, index };
};
export const decreaseQuantity = (index) => {
  return { type: DECREASE_QUANTITY, index };
};
export const addCart = (id, image, fullName, price) => {
  return { type: ADD_CART, payload: { id, image, fullName, price } };
};
export const removeCart = (index) => {
  return { type: REMOVE_CART, index };
};

export const quantityModifier = (value) => {
  return { type: QUANTITY_MODIFIER, value };
};
export const sendOrderInfo = (orderInfo, addressDelivery, isCOD) => {
  return { type: SEND_ORDER_INFO, orderInfo, addressDelivery, isCOD };
};

export const resetCart = () => {
  return { type: RESET_CART};
};
