import * as actions from "./types";

const initialState = {
	room: 0,
	user: {},
};

const appReducer = (state = initialState, action) => {
	// { type, data...} process
	// process action
	switch (action.type) {
		case actions.ROOM_FILTER: {
			return { ...state, room: action.value };
		}
		case actions.UPDATE_USER: {
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
		default:
			return state;
	}
};

export default appReducer;
// logger to print previsou state + new state
