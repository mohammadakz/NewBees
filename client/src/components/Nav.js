import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import AuthNav from "./auth0-buttons/auth-nav";

const Nav = () => {
  return (
    <Navivation>
      <h1>New Bees</h1>
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
  list-style: none;
`;

const StyledNav = styled(Link)`
  text-decoration: none;
  color: black;
  font-size: 20px;
`;
export default Nav;