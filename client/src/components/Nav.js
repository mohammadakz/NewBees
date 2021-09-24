<<<<<<< Updated upstream
=======
<<<<<<< Updated upstream
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
          <SearchBar />
        </Li>
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
      </NavigationUl>
      {cartItems.length && <h3>{cartItems.length}</h3>}
      <AuthNav />
    </Navivation>
  );
};

const Navivation = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;

const NavigationUl = styled.ul`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  /* width: 30vw; */
  /* margin-right: 30px; */
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
=======
>>>>>>> Stashed changes
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import AuthNav from "./auth0-buttons/auth-nav";
import CartContext from "./Hooks/Cart/CartContext";
import SearchBar from "./SearchBar";
<<<<<<< Updated upstream
=======
import CartIcon from "../assets/Cart_Icon.svg";
>>>>>>> Stashed changes

const Nav = () => {
  const { cartItems } = useContext(CartContext);

  return (
    <Navivation>
      <NavigationUl>
        <Li>
          <SearchBar />
        </Li>
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
<<<<<<< Updated upstream
          <StyledNav to="/cart">Cart</StyledNav>
        </Li>
      </NavigationUl>
      {cartItems.length && <h3>{cartItems.length}</h3>}
=======
          <StyledNav to="/cart">
            <Cart src={CartIcon} />
            {cartItems.length > 0 && <ItemCount>{cartItems.length}</ItemCount>}
          </StyledNav>
        </Li>
      </NavigationUl>
>>>>>>> Stashed changes
      <AuthNav />
    </Navivation>
  );
};

const Navivation = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;

const NavigationUl = styled.ul`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  /* width: 30vw; */
  /* margin-right: 30px; */
  list-style: none;
`;

const Li = styled.li`
  margin-right: 2%;
`;

const StyledNav = styled(Link)`
<<<<<<< Updated upstream
  text-decoration: none;
  color: #2f3437;
  font-size: 20px;
`;
export default Nav;
=======
  position: relative;
  text-decoration: none;
  color: #2f3437;
  font-size: 20px;
  text-align: center;
`;

const Cart = styled.img`
  vertical-align: middle;
  width: 120%;
`;

const ItemCount = styled.span`
  position: absolute;
  font-size: 0.9em;
  z-index: 10;
  letter-spacing: -1px;
  top: 3px;
  left: 17px;
  font-weight: bold;
`;

export default Nav;
>>>>>>> Stashed changes
>>>>>>> Stashed changes
