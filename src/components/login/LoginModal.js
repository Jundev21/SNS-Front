import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const ModalOverlay = styled.div`
  display: ${(props) => (props.isOpen ? "block" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 100;
`;

const ModalWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 30px 45px 50px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  width: 400px;
  position: relative;
  text-align: center;
`;

const CloseButton = styled.span`
  color: #aaa;
  font-size: 20px;
  position: absolute;
  top: 10px;
  right: 15px;
  cursor: pointer;
`;

const Form = styled.form`
  margin: 0 auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const Input = styled.input`
  max-width: 100%;
  padding: 11px 13px;
  background: #f9f9fa;
  color: black;
  margin-bottom: 0.9rem;
  border-radius: 4px;
  outline: 0;
  border: 1px solid rgba(245, 245, 245, 0.7);
  font-size: 14px;
  transition: all 0.3s ease-out;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.1), 0 1px 1px rgba(0, 0, 0, 0.1);

  :focus,
  :hover {
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.15), 0 1px 5px rgba(0, 0, 0, 0.1);
  }
`;

// const Button = styled.button`
//   max-width: 100%;
//   padding: 11px 13px;
//   color: rgb(253, 249, 243);
//   font-weight: 600;
//   text-transform: uppercase;
//   background: #0d6efe;
//   border: none;
//   border-radius: 3px;
//   outline: 0;
//   cursor: pointer;
//   margin-top: 0.6rem;
//   box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.1);
//   transition: all 0.3s ease-out;

//   :hover {
//     background: #3b71ca;
//   }
// `;

const Title = styled.h2`
  margin-bottom: 40px;
`;

const LoginModal = (props) => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = React.useState(false);
  const [dialogTitle, setDialogTitle] = React.useState("");
  const [dialogMessage, setDialogMessage] = React.useState("");
  const navigate = useNavigate();

  const openLoginModal = () => {
    setShowLoginModal(true);
  };

  const closeLoginModal = () => {
    setShowLoginModal(false);
  };

  const handleUserNameChange = (e) => {
    setUserName(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleSignIn = (event) => {
    event.preventDefault();

    axios({
      url: "/api/v1/users/login",
      method: "POST",
      data: {
        userName: userName,
        password: password,
      },
    })
      .then((res) => {
        localStorage.setItem("token", res.data.responseBody.token);
        navigate("/");
      })
      .catch((error) => {
        props.setCurrModalContent("로그인에 실패하셨습니다.");
        props.handleModal();
        props.handleNotiModal();
      });
  };

  return (
    <ModalOverlay isOpen={props.modalOpen}>
      <ModalWrapper>
        <ModalContent>
          <CloseButton onClick={props.handleModal}>&times;</CloseButton>
          <Title>로그인</Title>

          <Form>
            <Input placeholder={"아이디"} type="email" name="email" onChange={handleUserNameChange} />
            <Input placeholder={"비밀번호"} type="password" name="password" onChange={handlePasswordChange} />
            <Button onClick={handleSignIn}>로그인</Button>
          </Form>
        </ModalContent>
      </ModalWrapper>
    </ModalOverlay>
  );
};

export default LoginModal;
