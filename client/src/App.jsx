import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import TopNavigation from "./components/TopNavigation";
import React, { Suspense } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import NotFoundPage from "./pages/NotFoundPage";
import Sofa from './pages/Sofa'
import Footer from './components/Footer'
import Payment from "./pages/Payment";
import Product from './pages/Product'

function App() {
	return (
		<div className="App">
			<Router>
				<TopNavigation />
				<Suspense fallback={<h1>....</h1>}>
					<Switch>
						<Route exact path="/sofa">
							<Sofa />
						</Route>
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
						<Route exact path="/create_payment_url">
							<Payment />
						</Route>
						<Route path="/product/:id">
							<Product />
						</Route>
						<Route>
							<NotFoundPage />
						</Route>
						
					</Switch>
				</Suspense>
				<Footer />
			</Router>
		</div>
	);
}

export default App;
