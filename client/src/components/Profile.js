import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";

const Profile = () => {
  const { user, isAuthenticated } = useAuth0();
  if (isAuthenticated) {
    const userInfo = {
      fullName: user.name,
      email: user.email,
      image: user.picture,
    };
    fetch("/users", {
      method: "POST",
      body: JSON.stringify(userInfo),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
  }
  return <StyledDiv></StyledDiv>;
};

const StyledDiv = styled.div`
  display: none;
`;

export default Profile;
