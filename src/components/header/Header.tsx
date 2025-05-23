import styled from "styled-components";
import SearchBar from "./SearchBar";
import HeaderLogo from "./HeaderLogo";
import Login from "../login/Login";
import Register from "../login/Register";
import React, { useEffect, useState } from "react";
import Feed from "../feed/Feed";
import MyFeed from "../myFeed/MyFeed";
import WriteFeed from "../feed/WriteFeed";
import Notification from "../notification/Notification";
import LogOut from "../login/LogOut";
import snsImg from "../../img/sns.jpg";
import { useNavigate } from "react-router-dom";
import MyInfo from "./MyInfo";
import HoverModal from "../modal/HoverModal";
import { useAppSelector } from "../../redux/hooks";

function Header() {
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setIsLogin(true);
    }
  }, [sessionStorage.getItem("token")]);

  const HandleBoard = () => {
    navigate("/");
  };

  return (
    <HeaderContainer>
      <LogoArea onClick={HandleBoard}>
        <img src={snsImg} width={120} height={100} alt="snsImg" />
      </LogoArea>
      <HeaderWrapper>
        <SearchBar />
        <Feed />
        <WriteFeed />
        <MyFeed />
        {isLogin ? (
          <LoginInfo>
            <MyInfo setIsLogin={setIsLogin} />
            <Notification />
          </LoginInfo>
        ) : (
          <BeforeLoginInfo>
            <Login setIsLogin={setIsLogin} />
            <Register />
          </BeforeLoginInfo>
        )}
      </HeaderWrapper>
    </HeaderContainer>
  );
}

export default Header;

const HeaderContainer = styled.div`
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid rgb(238, 238, 238);
  background-color: rgb(255, 255, 255);
  position: sticky;
  z-index: 100;
`;

const HeaderWrapper = styled.div`
  flex-basis: 800px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-weight: bold;
  font-size: 18px;
`;

const LogoArea = styled.div`
  flex-basis: 10%;
  font-size: 50px;
  cursor: pointer;
  text-align: center;
`;

const BeforeLoginInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  
`;

const LoginInfo = styled.div`
  flex-basis: 9%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
`;
