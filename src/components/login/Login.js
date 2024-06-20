import styled from "styled-components";
import { useEffect, useState } from "react";
import axios from "axios";
import LoginModal from "./LoginModal";
import { useNavigate } from "react-router-dom";
import HoverModal from "components/modal/HoverModal";

function Login({ setIsLogin }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [notiModal, setNotiModal] = useState(false);
  const [currModalContent, setCurrModalContent] = useState("");
  const navigate = useNavigate();

  const handleModal = () => {
    setModalOpen((e) => !e);
  };
  const handleNotiModal = () => {
    setNotiModal((e) => !e);
  };
  return (
    <>
      <LoginContainer>
        <LoginWrapper onClick={handleModal}>로그인</LoginWrapper>
        {modalOpen && <LoginModal handleModal={handleModal} modalOpen={modalOpen} setIsLogin={setIsLogin} handleNotiModal={handleNotiModal} setCurrModalContent={setCurrModalContent} />}
        {notiModal && <HoverModal handleModal={handleNotiModal} currModalContent={currModalContent} />}
      </LoginContainer>
    </>
  );
}

export default Login;

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
