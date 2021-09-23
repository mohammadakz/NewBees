import React, { useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import AuthNav from "./auth0-buttons/auth-nav";
import CartContext from "./Hooks/Cart/CartContext";
import SearchBar from "./SearchBar";

const Nav = () => {
  const { cartItems } = useContext(CartContext);

  return (
    <Navivation>
      <NavigationUl>
        <Li>
          <StyledNav to="/">Home</StyledNav>
        </Li>
        <Li>
          <StyledNav to="/about">About</StyledNav>
        </Li>
        <Li>
          <StyledNav to="/contact">Contact</StyledNav>
        </Li>
        <Li>
          <StyledNav to="/cart">Cart</StyledNav>
        </Li>
        <Li>
          <SearchBar />
        </Li>
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
  width: 30vw;
  margin-right: 30px;
  list-style: none;
`;

const Li = styled.li`
  margin-right: 2%;
`;

const StyledNav = styled(Link)`
  text-decoration: none;
  color: #2f3437;
  font-size: 20px;
`;
export default Nav;
