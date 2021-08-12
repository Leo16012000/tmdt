import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import TopNavigation from "./components/TopNavigation";
import React, { Suspense } from "react";
import Home from "./pages/Home";
import Account from "./account/Account";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import NotFoundPage from "./pages/NotFoundPage";
import {Contact} from "./pages/Contact";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import Footer from "./components/Footer";
// import Payment from "./pages/Payment";
import Detail from "./pages/Detail";
import Form from "./pages/Form";
import VPNReturn from "./pages/VPNReturn";
import MomoReturn from "./pages/MomoReturn";
import Collections from "./pages/Collections";
import Checkouts from "./pages/Checkouts";

// account Auth
import { AuthProvider } from "./account/Auth";
import PhoneAuth from "./account/PhoneAuth";
import LogIn from "./account/LogIn";
import SignUp from "./account/SignUp";
import Orders from "./pages/Orders";
import UpdateOrder from "./pages/UpdateOrder";
import Admin from "./pages/Admin";

function App() {
	return (
		<div className="App">
			<Router>
				<AuthProvider>
					<TopNavigation />
					<ReactNotification />
					<Suspense fallback={<h1>....</h1>}>
						<main className="main__App">
							<Switch>
								<Route exact path="/">
									<Home />
								</Route>
								<Route exact path="/collections">
									<Collections />
								</Route>
								<Route exact path="/cart">
									<Cart />
								</Route>
								<Route exact path="/profile">
									<Profile />
								</Route>
								<Route exact path="/contact">
									<Contact />
								</Route>
								<Route exact path="/collections">
									<Collections />
								</Route>
								<Route exact path="/post">
									<Form />
								</Route>
								<Route exact path="/detail">
									<Detail />
								</Route>
								<Route exact path="/account">
									<Account />
								</Route>
								<Route exact path="/orders">
									<Orders />
								</Route>
								<Route exact path="/login" component={LogIn} />
								<Route exact path="/signup" component={SignUp} />
								<Route exact path="/phoneauth" component={PhoneAuth} />
								<Route exact path="/checkouts">
									<Checkouts />
								</Route>
								<Route exact path="/vnpay_return" component={VPNReturn} />
								<Route exact path="/checkouts/result" component={MomoReturn} />
								<Route exact path="/update-order" component={UpdateOrder} />
								<Route path="/admin">
									<Admin />
								</Route>
								<Route>
									<NotFoundPage />
								</Route>
							</Switch>
						</main>
						<Footer />
					</Suspense>
				</AuthProvider>
			</Router>
		</div>
	);
}

export default App;
