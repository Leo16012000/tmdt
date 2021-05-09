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
    {
      id: 3,
      image:
        "https://product.hstatic.net/1000360516/product/3_6af68c1787fe43d5af687508793262f0_master.jpg",
      name: "TỦ TRANG TRÍ SUNNY 1000",
      quantity: 2,
      unitCost: 7264000,
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

    default:
      return state;
  }
};

export default appReducer;
// logger to print previous state + new state
