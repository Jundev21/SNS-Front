import LoginModal from "../login/LoginModal";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

function MyFeed() {
  const navigate = useNavigate();

  const HandleBoard = () => {
    navigate("/my/feed");
  };

  return (
    <>
      <LoginContainer onClick={HandleBoard}>
        <LoginWrapper>나의 게시글</LoginWrapper>
      </LoginContainer>
    </>
  );
}

export default MyFeed;

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
