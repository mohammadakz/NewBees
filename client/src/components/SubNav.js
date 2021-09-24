import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const SubNav = () => {
  return (
    <SubNavigation>
      <SubNavLink to={"/categories/Entertainment"}>Entertainment</SubNavLink>
      <SubNavLink to={"/categories/Fitness"}>Fitness</SubNavLink>
      <SubNavLink to={"/categories/Gaming"}>Gaming</SubNavLink>
      <SubNavLink to={"/categories/Gaming"}>Industrial</SubNavLink>
      <SubNavLink to={"/categories/Lifestyle"}>Lifestyle</SubNavLink>
      <SubNavLink to={"/categories/Medical"}>Medical</SubNavLink>
      <SubNavLink to={"/"}>All Products</SubNavLink>
    </SubNavigation>
  );
};

const SubNavigation = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding-top: 1%;
  text-decoration: none;
  margin: 0 auto 0 auto;
  max-width: 75%;
  height: 4vh;
  font-size: 0.9em;
  justify-content: space-evenly;
  position: sticky;
  top: 5vh;
  background-color: #eaeded;
  z-index: 999;
  align-items: center;
`;

const SubNavLink = styled(NavLink)`
  text-decoration: none;
  color: #000;

  &:hover {
    transform: scale(1.05);
  }

  &.active {
    font-weight: bold;
  }
`;

export default SubNav;
