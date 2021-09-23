import React from "react";
import styled from "styled-components";

const SearchBar = () => {
  return <Search type="text" placeholder="Search" />;
};

const Search = styled.input`
  padding: 10px;
  border-radius: 5px;
  font-size: 1.4em;
  width: 170px;
  border: none;
  outline: none;
  border: 2px solid #e4e4e4;

  &:active {
    border-color: #2f3437;
  }
`;

export default SearchBar;
