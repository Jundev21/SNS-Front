import React, { useState } from "react";
import Modal from "react-modal";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

function MyInfo({ setIsLogin }) {
  const [isHovered, setHovered] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLogin(false);
    navigate("/");
  };

  const handleMyPage = () => {
    navigate("/my/info");
  };

  const handleMouseEnter = () => {
    setHovered(true);
    setModalOpen(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
    setModalOpen(false);
  };
  return (
    <ModalWrapper>
      <HoverContainer onMouseOver={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <UserIcon>
          <i className="bi bi-person-circle"> </i>
        </UserIcon>
        {isHovered && (
          <ModalContents>
            <ModalList onClick={handleMyPage}> 마이페이지</ModalList>
            <ModalList onClick={handleLogout}> 로그아웃</ModalList>
          </ModalContents>
        )}
      </HoverContainer>
    </ModalWrapper>
  );
}

export default MyInfo;

const UserIcon = styled.div`
  color: #807979;
  cursor: pointer;
  font-size: 30px;
`;
const ModalContainer = styled.div`
  width: 100px;
  height: 100px;
  background: black;
`;

const ModalWrapper = styled.div``;

const HoverContainer = styled.div`
  position: relative;
`;

const ModalContents = styled.ul`
  position: absolute;
  box-sizing: border-box;
  overflow-y: scroll;
  max-height: 150px;
  left: -200%;
  width: 150px;
  z-index: 10;
  background: white;
  padding: 20px 0px;
  border: 1px solid grey;
  border-radius: 5px;
  list-style-type: none;
  text-align: center;
`;

const ModalList = styled.li`
  cursor: pointer;
  margin-bottom: 5px;

  &:hover {
    color: gray;
  }
`;
