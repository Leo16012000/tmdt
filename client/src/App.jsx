import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import TopNavigation from "./components/TopNavigation";
import React, { Suspense } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import NotFoundPage from "./pages/NotFoundPage";
import Account from "./components/Account";
import Contact from "./pages/Contact";

function App() {
  return (
    <div className="App">
      <Router>
        <TopNavigation />
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
            <Route exact path="/account">
              <Account />
            </Route>
            <Route exact path="/contact">
              <Contact />
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
