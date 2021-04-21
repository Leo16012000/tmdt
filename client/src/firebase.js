import firebase from "firebase/app";
import "firebase/auth";

const app = firebase.initializeApp({
	apiKey: "AIzaSyA2xYU-5q84mMsNkRz0PheYjUjxWcEFEF0",
	authDomain: "logine-commerce.firebaseapp.com",
	projectId: "logine-commerce",
	storageBucket: "logine-commerce.appspot.com",
	messagingSenderId: "88952709082",
	appId: "1:88952709082:web:ecd2cb833fe7fb089d6ae3",
	measurementId: "G-MHX55P0YSJ",
});

export const auth = app.auth();
export default app;
