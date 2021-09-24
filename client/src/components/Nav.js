import React, { useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import AuthNav from "./auth0-buttons/auth-nav";
import CartContext from "./Hooks/Cart/CartContext";
import SearchBar from "./SearchBar";

const Nav = () => {
  const { cartItems } = useContext(CartContext);

  return (
    <>
      <Navivation>
        <Home to={"/"}>New Bees</Home>

        <StyledNav to="/">Home</StyledNav>

        <StyledNav to="/about">About</StyledNav>

        {/* <StyledNav to="/contact">Contact</StyledNav> */}

        <SearchBar />
        <StyledNav to="/cart">Cart</StyledNav>

        {cartItems.length && <h3>{cartItems.length}</h3>}
        <AuthNav />
      </Navivation>
    </>
  );
};

const Navivation = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
  margin: auto;
`;

const Home = styled(Link)`
  text-decoration: none;
  color: #ffd750;
  font-size: 2em;
  font-weight: bold;
`;

const StyledNav = styled(Link)`
  text-decoration: none;
  color: #2f3437;
  font-size: 1.1em;
  margin: 0 3% 0 3%;
`;
export default Nav;
