import styled from "styled-components";
import { useEffect, useState } from "react";
import axios from "axios";
import LoginModal from "./LoginModal";
import { useNavigate } from "react-router-dom";

function LogOut({ setIsLogin }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLogin(false);
    navigate("/");
  };

  return (
    <>
      <LoginContainer>
        <LoginWrapper onClick={handleLogout}>로그아웃</LoginWrapper>
      </LoginContainer>
    </>
  );
}

export default LogOut;

const LoginContainer = styled.div`
  padding: 0 10px;
  color: black;
  &:hover {
    text: bold;
  }
`;

const LoginWrapper = styled.div`
  cursor: pointer;
  &:hover {
    font-weight: bold;
  }
`;
