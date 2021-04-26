import { store } from "react-notifications-component";

const sendMessage = (title, message, type) => {
	store.addNotification({
		title: title,
		message: message,
		type: type,
		insert: "top",
		container: "top-right",
		animationIn: ["animate__animated", "animate__fadeIn"],
		animationOut: ["animate__animated", "animate__fadeOut"],
		dismiss: {
			click: true,
			pauseOnHover: true,
			duration: 2500,
			onScreen: true,
		},
	});
};

export default sendMessage;
