import React, { useState, useContext } from "react";
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
import { useAuth0 } from "@auth0/auth0-react";
import CartContext from "./Hooks/Cart/CartContext";
import CategoryDisplay from "./CategoryDisplay";

function App() {
  const { cartItems, removeItemsFromCart, updateCart } = useContext(
    CartContext
  );
  const [loading, setLoading] = useState(true);

  const { user, isAuthenticated } = useAuth0();

  //Fetching user's cart from the DB
  React.useEffect(() => {
    if (isAuthenticated) {
      fetch("/getcart", {
        method: "POST",
        body: JSON.stringify({ email: user.email }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          updateCart(data.data);
          setLoading(false);
        });
    }
  }, [isAuthenticated]);

  return (
    <Router>
      <GlobalStyles />
      <Header />
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/about" exact>
          <About />
        </Route>
        <Route path="/contact" exact>
          <Contact />
        </Route>
        <Route path="/cart" exact>
          <Cart />
        </Route>
        <Route path="/categories/:categoryId" exact>
          <CategoryDisplay />
        </Route>
        <Route path="/confirmation" exact>
          <ConfirmationPage />
        </Route>
        <Route path="/products/:productId" exact>
          <ProductDetails />
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
