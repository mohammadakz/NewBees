import React from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import Header from "./Header";
import Home from "./Home";
import About from "./About";
import Contact from "./Contact";
import Cart from "./Cart";
import Footer from "./Footer";
import ProductDetails from "./ProductDetails";
import ConfirmationPage from "./ConfirmationPage";
import { GlobalStyles } from "./Global/GlobalStyles";

function App() {
  return (
    <Router>
      <GlobalStyles />
      <Header />
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/contact">
          <Contact />
        </Route>
        <Route path="/cart">
          <Cart />
        </Route>
        <Route path="/confirmation">
          <ConfirmationPage />
        </Route>
        <Route path="/products/:productId">
          <ProductDetails />
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
