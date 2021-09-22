import React, { useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import AuthNav from "./auth0-buttons/auth-nav";
import CartContext from "./Hooks/Cart/CartContext";

const Nav = () => {
  const { cartItems } = useContext(CartContext);

  return (
    <Navivation>
      <NavigationUl>
        <li>
          <StyledNav to="/">Home</StyledNav>
        </li>
        <li>
          <StyledNav to="/about">About</StyledNav>
        </li>
        <li>
          <StyledNav to="/contact">Contact</StyledNav>
        </li>
        <li>
          <StyledNav to="/cart">Cart</StyledNav>
        </li>
      </NavigationUl>
      {cartItems.length > 0 && <h3>{cartItems.length}</h3>}

      <AuthNav />
    </Navivation>
  );
};

const Navivation = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const NavigationUl = styled.ul`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  width: 20vw;
  margin-right: 30px;
  list-style: none;
`;

const StyledNav = styled(Link)`
  text-decoration: none;
  color: #2f3437;
  font-size: 20px;
`;
export default Nav;
