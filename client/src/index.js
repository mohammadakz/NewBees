import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import CartState from "./components/Hooks/Cart/CartState";
import { BrowserRouter as Router } from "react-router-dom";
import Auth0ProviderWithHistory from "./auth/auth0-provider-with-history";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Auth0ProviderWithHistory>
        <CartState>
          <App />
        </CartState>
      </Auth0ProviderWithHistory>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
