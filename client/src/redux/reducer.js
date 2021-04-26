import {
	ROOM_FILTER,
	CATEGORY_FILTER,
	PRICE_FILTER,
	SEARCH_FILTER,
	UPDATE_USER,
} from "./types";

const initialState = {
	room: 0,
	category: "all",
	priceLower: 0,
	priceUpper: 0,
	keyword: "",
	user: {},
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
					address: action.payload.address,
					verify: action.payload.verify,
				},
			};
		}
		case SEARCH_FILTER: {
			console.log("Enter SEARCH_FILTER")
			return { ...state,priceUpper: 0, priceLower: 0, keyword: action.value };
		}
		default:
			return state;
	}
};

export default appReducer;
// logger to print previsou state + new state
