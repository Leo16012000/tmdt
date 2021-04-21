import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import TopNavigation from "./components/TopNavigation";
import React, { Suspense } from "react";
import Home from "./pages/Home";
import Account from "./pages/Account";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import NotFoundPage from "./pages/NotFoundPage";
import Contact from "./pages/Contact";
import Collections from "./pages/Collections";
import Sofa from "./pages/Sofa";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";

function App() {
	return (
		<div className="App">
			<Router>
				<TopNavigation />
				<ReactNotification />
				<Suspense fallback={<h1>....</h1>}>
					<Switch>
						<Route exact path="/">
							<Home />
						</Route>
						<Route path="/cart">
							<Cart />
						</Route>
						<Route path="/profile">
							<Profile />
						</Route>
						<Route path="/account">
							<Account />
						</Route>
						<Route path="/contact">
							<Contact />
						</Route>
						<Route path="/collections">
							<Collections />
						</Route>
						<Route exact path="/sofa">
							<Sofa />
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
