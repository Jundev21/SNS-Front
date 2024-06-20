import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import HoverModal from "components/modal/HoverModal";

const ModalOverlay = styled.div`
  display: ${(props) => (props.isOpen ? "block" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
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

const Form = styled.div`
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

const Button = styled.button`
  max-width: 100%;
  padding: 11px 13px;
  color: rgb(253, 249, 243);
  font-weight: 600;
  text-transform: uppercase;
  background: #0d6efe;
  border: none;
  border-radius: 3px;
  outline: 0;
  cursor: pointer;
  margin-top: 0.6rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease-out;
  display: disable;

  :hover {
    background: #3b71ca;
  }
`;

const Title = styled.h2`
  margin-bottom: 40px;
`;

const RegisterModal = (props) => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const handleSignUp = (event) => {
    event.preventDefault();

    if (password === "" || passwordConfirm === "" || email === "" || userName === "") {
      alert("다시한번 확인해주세요.");
      return;
    } else if (password !== passwordConfirm) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    axios({
      url: "/api/v1/users/register",
      method: "POST",
      withCredentials: true,
      data: {
        userName: userName,
        password: password,
        userEmail: email,
      },
    })
      .then((res) => {})
      .catch((error) => {
        props.setCurrModalContent(error.response.data.responseCode);
      });
    props.setCurrModalContent("회원가입을 축하합니다.");
    props.handleModal();
    props.handleNotiModal();
  };

  const closeLoginModal = () => {
    setShowLoginModal(false);
  };

  const handleUserNameChange = (e) => {
    setUserName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handlePasswordConfirm = (e) => {
    setPasswordConfirm(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    closeLoginModal();
  };

  useEffect(() => {
    const CookiesAccessToken = window.localStorage.getItem("token");
    if (CookiesAccessToken) {
      window.confirm("이미 등록된 회원입니다.");
    }
  }, [window.localStorage.getItem("token")]);

  return (
    <div>
      <ModalOverlay isOpen={props.modalOpen}>
        <ModalWrapper>
          <ModalContent>
            <Title>회원가입</Title>
            <CloseButton onClick={props.handleModal}>&times;</CloseButton>

            <Form>
              <Input placeholder={"아이디"} type="name" name="name" onChange={handleUserNameChange} />
              <Input placeholder={"이메일"} type="email" name="email" onChange={handleEmailChange} />
              <Input placeholder={"비밀번호"} type="password" name="password" onChange={handlePasswordChange} />
              <Input placeholder={"비밀번호 확인"} type="password" name="password" onChange={handlePasswordConfirm} />
              <Button className="btn btn-primary" onClick={handleSignUp}>
                회원가입
              </Button>
            </Form>
          </ModalContent>
        </ModalWrapper>
      </ModalOverlay>
    </div>
  );
};

export default RegisterModal;
