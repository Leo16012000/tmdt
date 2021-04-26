import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import CircularProgress from "@material-ui/core/CircularProgress";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
	const [loading, setLoading] = useState(true);
	const [currentUser, setCurrentUser] = useState(null);

	useEffect(() => {
		auth.onAuthStateChanged((user) => {
			setCurrentUser(user);
			setLoading(false);
		});
	}, []);

	if (loading) {
		return (
			<div
				style={{
					width: "100%",
					position: "fixed",
					top: "50%",
				}}
			>
				<CircularProgress
					style={{
						width: "5%",
						height: "5%",
					}}
					color="secondary"
				/>
			</div>
		);
	}

	return (
		<AuthContext.Provider value={{ currentUser }}>
			{children}
		</AuthContext.Provider>
	);
};
