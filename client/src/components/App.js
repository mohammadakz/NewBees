import React from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import Header from "./Header";
import Home from "./Home";
import About from "./About";
import Contact from "./Contact";
import Cart from "./Cart";
import ProductDetails from "./ProductDetails";

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/contact">
          <About />
        </Route>
        <Route path="/about">
          <Contact />
        </Route>
        <Route path="/cart">
          <Cart />
        </Route>
        <Route path="/products/:productId">
          <ProductDetails />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
