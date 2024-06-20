import LoginModal from "../login/LoginModal";
import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function WriteFeed() {
  const navigate = useNavigate();

  const HandleBoard = () => {
    navigate("/write/feed");
  };

  return (
    <>
      <LoginContainer onClick={HandleBoard}>
        <LoginWrapper>게시글 작성</LoginWrapper>
      </LoginContainer>
    </>
  );
}

export default WriteFeed;

const LoginContainer = styled.div`
  padding: 0 10px;
  color: black;
  cursor: pointer;
  &:hover {
    text: bold;
  }
`;

const LoginWrapper = styled.div`
  &:hover {
    text: bold;
  }
`;
