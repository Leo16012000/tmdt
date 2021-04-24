import {
  ROOM_FILTER,
  CATEGORY_FILTER,
  PRICE_FILTER,
  SEARCH_FILTER,
  UPDATE_USER,
  INCREASE_QUANTITY,
  DECREASE_QUANTITY,
  ADD_CART,
} from "./types";

const initialState = {
  room: 0,
  category: "all",
  priceLower: 0,
  priceUpper: 0,
  keyword: "",
  user: {},
  listCart: [
    {
      id: 1,
      image:
        "https://product.hstatic.net/1000360516/product/7_a484fc6a967b4ffb83b65a51046c2bb4_master.jpg",
      name: "BỘ BÀN ĂN CABIN 4 GHẾ XUẤT KHẨU",
      quantity: 1,
      unitCost: 2850000,
    },
    {
      id: 2,
      image:
        "https://product.hstatic.net/1000360516/product/cover_ke-da-nang_600-_01__2a141d8a90804058930083a7a4c8646b_master.jpg",
      name: "KỆ TRANG TRÍ ĐA NĂNG 3 TẦNG",
      quantity: 2,
      unitCost: 2600000,
    },
  ],
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
      return { ...state, priceLower: action.lower, priceUpper: action.upper };
    }
    case UPDATE_USER: {
      return {
        ...state,
        user: {
          email: action.payload.email,
          displayName: action.payload.displayName,
          phoneNumber: action.payload.phoneNumber,
          photoUrl: action.payload.photoUrl,
          verify: action.payload.verify,
        },
      };
    }
    case SEARCH_FILTER: {
      return { ...state, category: "all", keyword: action.value };
    }
    case INCREASE_QUANTITY: {
      state.listCart[action.index].quantity++;
      return {
        ...state,
        listCart: [...state.listCart],
      };
    }
    case DECREASE_QUANTITY: {
      state.listCart[action.index].quantity--;
      return {
        ...state,
        listCart: [...state.listCart],
      };
    }
    case ADD_CART: {
      const cartItem = {
        id: action.payload.id,
        image: action.payload.image,
        name: action.payload.fullName,
        quantity: 1,
        unitCost: action.payload.price,
      };
      state.listCart.push(cartItem);
      return {
        ...state,
        listCart: [...state.listCart],
      };
    }
    default:
      return state;
  }
};

export default appReducer;
// logger to print previsou state + new state
