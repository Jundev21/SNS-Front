import styled from "styled-components";
import { useEffect, useState } from "react";
import axios from "axios";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";
import HoverModal from "components/modal/HoverModal";

function Register() {
  const [modalOpen, setModalOpen] = useState(false);
  const [notiModal, setNotiModal] = useState(false);
  const [currModalContent, setCurrModalContent] = useState("");

  const handleModal = () => {
    setModalOpen((e) => !e);
  };
  const handleNotiModal = () => {
    setNotiModal((e) => !e);
  };

  return (
    <>
      <RegisterContainer>
        <RegisterWrapper onClick={handleModal}>회원가입</RegisterWrapper>
        {modalOpen && <RegisterModal handleModal={handleModal} modalOpen={modalOpen} handleNotiModal={handleNotiModal} setCurrModalContent={setCurrModalContent} />}
        {notiModal && <HoverModal handleModal={handleNotiModal} currModalContent={currModalContent} />}
      </RegisterContainer>
    </>
  );
}

export default Register;

const RegisterContainer = styled.div`
  padding: 0 10px;
  border-left: 1px solid black;
  color: black;
  &:hover {
    text: bold;
  }
`;

const RegisterWrapper = styled.div`
  cursor: pointer;
  &:hover {
    font-weight: bold;
  }
`;
