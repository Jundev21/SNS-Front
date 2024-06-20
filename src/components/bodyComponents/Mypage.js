import styled from "styled-components";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import HoverModal from "components/modal/HoverModal";
import LoadingAnimation from "components/modal/LoadingAnimation";
import AskModal from "components/modal/AskModal";

function Mypage() {
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [email, setEmail] = useState("");
  const [userInfo, setUserInfo] = useState("");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [notiModal, setNotiModal] = useState(false);
  const [currModalContent, setCurrModalContent] = useState("");
  const [askModal, setAskModal] = useState(false);

  const handleNotiModal = () => {
    setNotiModal((e) => !e);
    if (notiModal) {
      navigate("/");
    }
  };

  const handleAskModal = () => {
    setAskModal((e) => !e);
  };

  const handleUserInfo = () => {
    axios({
      url: "/api/v1/users",
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => {
        setIsLoading(false);
        setUserInfo(res.data.responseBody);
      })
      .catch((error) => {
        // navigate("/authentication/sign-in");
      });
  };

  useEffect(() => {
    // @ts-ignore
    handleUserInfo();
  }, []);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handlePasswordConfirm = (e) => {
    setPasswordConfirm(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleClose = () => {
    navigate("/");
  };

  const handleUpdateInfo = (event) => {
    if (password === "") {
      alert("비밀번호를 입력해주세요");
      return;
    }

    if (password !== passwordConfirm) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    axios({
      url: "/api/v1/users",
      method: "PUT",
      withCredentials: true,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: {
        userEmail: email,
        password: password,
      },
    })
      .then((res) => {})
      .catch((error) => {
        setCurrModalContent("수정 실패하였습니다.");
        // navigate("/authentication/sign-in");
      });
    setCurrModalContent("수정이 완료되었습니다.");
    setNotiModal(true);
  };

  async function handleDelete() {
    handleAskModal();
    axios({
      url: "/api/v1/users",
      method: "DELETE",
      withCredentials: true,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => {
        setCurrModalContent("회원탈퇴가 완료되었습니다.");
        localStorage.removeItem("token");
        // navigate("/");
        // setNotiModal(true);
      })
      .catch((error) => {
        setCurrModalContent("회원탈퇴에 실패하였습니다.");
        // navigate("/authentication/sign-in");
      });

    setNotiModal(true);
  }

  const handlAskModal = () => {
    setCurrModalContent("회원 탈퇴를 하시겠습니까?");
    setAskModal(true);
  };

  return (
    <BodyContainer>
      <BodyWrapper>
        {isLoading ? (
          <LoadingAnimation />
        ) : (
          <MemberContainer>
            <LeftContainer>
              <UserIcon>
                <i className="bi bi-person-circle"> </i>
              </UserIcon>
              <InputFile>
                <label htmlFor="formFile" className="form-label"></label>
                <input className="form-control" type="file" id="formFile" />
              </InputFile>
            </LeftContainer>

            <RightContainer>
              <Form>
                <label>아이디</label>
                <ID>{userInfo.userName}</ID>
                <label>이메일</label>
                <Input placeholder={userInfo.userEmail} type="email" name="password" onChange={handleEmailChange} />
                <label>비밀번호</label>
                <Input placeholder={"비밀번호"} type="password" name="password" onChange={handlePasswordChange} />
                <label>비밀번호 확인</label>
                <Input placeholder={"비밀번호 확인"} type="password" name="password" onChange={handlePasswordConfirm} />
                <div className="d-grid gap-2 d-md-block mt-4 d-md-flex justify-content-md-center">
                  <button type="button" className="btn btn-outline-danger px-5 me-md-2" onClick={handlAskModal}>
                    탈퇴
                  </button>
                  <button type="button" className="btn btn-outline-danger px-5 me-md-2" onClick={handleClose}>
                    취소
                  </button>
                  <button type="button" className="btn btn-primary px-5" onClick={handleUpdateInfo}>
                    저장
                  </button>
                </div>
              </Form>

              {notiModal && <HoverModal handleModal={handleNotiModal} currModalContent={currModalContent} />}
              {askModal && <AskModal handleModal={handleAskModal} currModalContent={currModalContent} activeAxios={handleDelete} />}
            </RightContainer>
          </MemberContainer>
        )}
      </BodyWrapper>
    </BodyContainer>
  );
}

export default Mypage;

const BodyContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const BodyWrapper = styled.div`
  width: 850px;
  margin: auto;
  padding: 30px 0;
`;
const MemberContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;

  border: 1px solid rgba(245, 245, 245, 0.7);
  border-radius: 8px;
  padding: 40px;
`;

const LeftContainer = styled.div`
  font-size: 100px;

  width: 40%;
`;
const RightContainer = styled.div`
  width: 60%;
  padding: 10px;
`;

const UserIcon = styled.div`
  text-align: center;
  color: #807979;
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

const Form = styled.div`
  margin: 0 auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const InputFile = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px 5px;
`;

const ID = styled.div`
  padding: 7px 12px;
`;
