import React from "react";
import styled from "styled-components";

const SearchBar = () => {
  return <Search type="text" placeholder="Not working! (╯°□°）╯︵ ┻━┻" />;
};

const Search = styled.input`
  padding: 10px;
  margin: 0 5% 0 5%;
  border-radius: 5px;
  font-size: 1.2em;
  min-width: 300px;
  max-width: 400px;
  border: none;
  outline: none;
  border: 2px solid #e4e4e4;

  &:active {
    border-color: #2f3437;
  }
`;

export default SearchBar;
