import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import { useAppDispatch } from "redux/hooks";
import { setUserProfile } from "../../redux/dataSlice";
import axios from "axios";

function MyInfo({ setIsLogin }) {
  const { userProfileImg } = useAppSelector((state) => state.searchState);
  const [isHovered, setHovered] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [updateUserProfileImg, setUpdateUserProfileImg] = useState("");

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    dispatch(setUserProfile(""));
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

  const navigateToHome = () => {
    navigate("/my/info");
  };

  useEffect(() => {
    const handleUserInfo = () => {
      axios({
        url: "/api/v1/users",
        method: "GET",
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      })
        .then((res) => {
          setUpdateUserProfileImg(res.data.responseBody.userProfileImgUrl);
        })
        .catch((error) => {
          navigate("/");
        });
    };
    handleUserInfo();
  }, [setIsLogin, userProfileImg]);
  return (
    <ModalWrapper>
      <HoverContainer onMouseOver={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <UserIcon>
          {updateUserProfileImg === "" && <DefaultImg className="bi bi-person-circle"> </DefaultImg>}
          {updateUserProfileImg !== "" && <ImageThumbnail src={updateUserProfileImg} />}
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
  font-size: 1rem;
`;

const ModalList = styled.li`
  cursor: pointer;
  margin-bottom: 5px;

  &:hover {
    color: gray;
  }
`;

const ImageThumbnail = styled.img`
  width: 40px;
  height: 40px;
  border-radius:50%;
  object-fit:cover;
`;

const DefaultImg = styled.i`
  font-size:160%;
  border-radius:50%;
`
