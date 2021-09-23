import React from "react";
import LoginButton from "./login";
import LogoutButton from "./logout";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";

const AuthenticationButton = () => {
  const { user, isAuthenticated } = useAuth0();

  return isAuthenticated ? (
    <div>
      <LogoutButton />
      <Img src={user.picture} alt="" />
    </div>
  ) : (
    <LoginButton />
  );
};
const Img = styled.img`
  display: block;
  top: 22px;
  right: 150px;
  position: absolute;
  width: 50px;
  border-radius: 25px;
`;

export default AuthenticationButton;
