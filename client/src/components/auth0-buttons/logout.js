import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";

const LogoutButton = () => {
  const { logout } = useAuth0();
  return (
    <StyledButton
      className="btn btn-danger btn-block"
      onClick={() =>
        logout({
          returnTo: window.location.origin,
        })
      }
    >
      Log Out
    </StyledButton>
  );
};

const StyledButton = styled.button`
  border: none;
  background: none;
  font-size: 1.2rem;
  padding: 1rem 2rem;
  background-color: #438ea7;
  border-radius: 1.2rem;
  color: white;
  cursor: pointer;
  &:hover {
    background-color: lightgray;
    color: #438ea7;
    transition: 0.3s ease-in-out all;
  }
`;
export default LogoutButton;
