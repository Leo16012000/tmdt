import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import TopNavigation from "./components/TopNavigation";
import React, { Suspense } from "react";
import Home from "./pages/Home";
import Account from "./account/Account";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import NotFoundPage from "./pages/NotFoundPage";
import Contact from "./pages/Contact";
// import Sofa from "./pages/Sofa";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
// import Footer from "./components/Footer";
// import Payment from "./pages/Payment";
// import Product from "./pages/Product";
import Form from "./pages/Form";
import VPNReturn from "./pages/VPNReturn";
import Collections from "./pages/Collections";

// account Auth
import { AuthProvider } from "./account/Auth";
import PhoneAuth from "./account/PhoneAuth";
import LogIn from "./account/LogIn";
import SignUp from "./account/SignUp";

function App() {
	return (
		<div className="App">
			<AuthProvider>
				<Router>
					<TopNavigation />
					<ReactNotification />
					<Suspense fallback={<h1>....</h1>}>
						<Switch>
							<Route exact path="/collections">
								<Collections />
							</Route>

							<Route exact path="/">
								<Home />
							</Route>
							<Route path="/cart">
								<Cart />
							</Route>
							<Route path="/profile">
								<Profile />
							</Route>
							<Route path="/contact">
								<Contact />
							</Route>
							<Route path="/collections">
								<Collections />
							</Route>
							<Route path="/post">
								<Form />
							</Route>
							<Route path="/vnpay_return" component={VPNReturn} />
							<Route path="/account">
								<Account />
							</Route>
							<Route exact path="/login" component={LogIn} />
							<Route exact path="/signup" component={SignUp} />
							<Route exact path="/phoneauth" component={PhoneAuth} />
							<Route>
								<NotFoundPage />
							</Route>
						</Switch>
					</Suspense>
				</Router>
			</AuthProvider>
		</div>
	);
}

export default App;
