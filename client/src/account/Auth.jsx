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
					height: "100%",
					display: "flex",
					position: "fixed",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<CircularProgress
					style={{
						width: "20%",
						height: "20%",
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
