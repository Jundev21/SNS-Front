import LoginModal from "../login/LoginModal";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

function Feed() {
  const navigate = useNavigate();

  const HandleBoard = () => {
    navigate("/");
  };

  return (
    <>
      <LoginContainer onClick={HandleBoard}>
        <LoginWrapper>게시글 보기</LoginWrapper>
      </LoginContainer>
    </>
  );
}

export default Feed;

const LoginContainer = styled.div`
  padding: 0 10px;
  color: black;
  cursor: pointer;

  &:hover {
    text: bold;
  }
`;

const LoginWrapper = styled.div`
  cursor: pointer;

  &:hover {
    text: bold;
  }
`;
