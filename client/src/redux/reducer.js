import {
  ROOM_FILTER,
  CATEGORY_FILTER,
  PRICE_FILTER,
  SEARCH_FILTER,
  UPDATE_USER,
  INCREASE_QUANTITY,
  DECREASE_QUANTITY,
  ADD_CART,
  REMOVE_CART,
  QUANTITY_MODIFIER,
  SEND_ORDER_INFO,
  RESET_CART,
  TO_ADDRESS,
  IMAGE
} from "./types";

const initialState = {
  quantity: 0,
  room: 0,
  category: "all",
  priceLower: 0,
  priceUpper: 0,
  keyword: "",
  user: {},
  orderInfo: {},
  addressDelivery: "",
  isCOD: 1,
  listCart: [],
  toDistrictId:null,
  toWardId:null,
  image: '',
};

const appReducer = (state = initialState, action) => {
  // { type, data...} process
  // process action
  switch (action.type) {
    case IMAGE: {
      return { ...state, image: action.value };
    }
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
      console.log("Enter SEARCH_FILTER");
      return { ...state, priceUpper: 0, priceLower: 0, keyword: action.value };
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
      var isExisten = false;
      var newListCart = state.listCart.map((item) => {
        if (item.id === action.payload.id) {
          isExisten = true;
          return {
            ...item,
            quantity: item.quantity + state.quantity,
          };
        } else return item;
      });

      if (!isExisten) {
        newListCart.push({
          id: action.payload.id,
          image: action.payload.image,
          name: action.payload.fullName,
          quantity: state.quantity,
          unitCost: action.payload.price,
        });
        console.log("New Item");
      }

      return {
        ...state,
        listCart: newListCart,
      };
    }
    case REMOVE_CART: {
      state.listCart.splice(action.index, 1);
      console.log(state.listCart);
      return {
        ...state,
        listCart: [...state.listCart],
      };
    }
    case QUANTITY_MODIFIER: {
      return { ...state, quantity: action.value };
    }
    case SEND_ORDER_INFO: {
      return {
        ...state,
        orderInfo: action.orderInfo,
        addressDelivery: action.addressDelivery,
        isCOD: action.isCOD,
      };
    }
    case RESET_CART: {
      return {
        ...state,
          listCart : []
      };
    }
    case TO_ADDRESS: {
      return {
        ...state,
        toDistrictId:action.districtId,
        toWardId:action.wardId,
      };
    }

    default:
      return state;
  }
};

export default appReducer;
// logger to print previous state + new state
