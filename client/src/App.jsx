import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import TopNavigation from "./components/TopNavigation";
import React, { Suspense } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
	return (
		<div className="App">
			<Router>
				<TopNavigation />
				Loading
				<Suspense fallback={<h1>....</h1>}>
					<Switch>
						<Route exact path="/">
							<Home />
						</Route>
						<Route exact path="/login">
							<Login />
						</Route>
						<Route exact path="/cart">
							<Cart />
						</Route>
						<Route exact path="/profile">
							<Profile />
						</Route>
						<Route>
							<NotFoundPage />
						</Route>
					</Switch>
				</Suspense>
			</Router>
		</div>
	);
}

export default App;
