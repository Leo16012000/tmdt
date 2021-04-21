import * as actions from "./types";

export const roomFilter = (value) => {
	return { type: actions.ROOM_FILTER, value };
};

export const updateUser = (
	email,
	displayName,
	phoneNumber,
	photoUrl,
	verify
) => {
	return {
		type: actions.UPDATE_USER,
		payload: { email, displayName, phoneNumber, photoUrl, verify },
	};
};
