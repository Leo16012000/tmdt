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
import Collections from "./pages/Collections";

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
            <Route path="/login">
              <Login />
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
