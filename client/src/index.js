import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import CartState from "./components/Hooks/Cart/CartState";

ReactDOM.render(
  <React.StrictMode>
    <CartState>
      <App />
    </CartState>
  </React.StrictMode>,
  document.getElementById("root")
);
