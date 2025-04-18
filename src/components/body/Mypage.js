import styled from "styled-components";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import HoverModal from "components/modal/HoverModal";
import LoadingAniWithBackGround from "components/modal/LoadingAniWithBackGround";
import LoadingAnimation from "components/modal/LoadingAnimation";
import AskModal from "components/modal/AskModal";
import { useAppSelector } from "redux/hooks";
import { useAppDispatch } from "redux/hooks";
import { setUserProfile, setSearchWordTK } from "../../redux/dataSlice";

function Mypage() {
  const [userProfilePreview, setUserProfileImgHook] = useState("");
  const [updateUserProfileImg, setUpdateUserProfileImg] = useState("");

  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [email, setEmail] = useState("");
  const [userInfo, setUserInfo] = useState("");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [upDateLoading, setUpdateIsLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [notiModal, setNotiModal] = useState(false);
  const [currModalContent, setCurrModalContent] = useState("");
  const [askModal, setAskModal] = useState(false);
  const dispatch = useAppDispatch();

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
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    })
      .then((res) => {
        setIsLoading(false);
        setUserInfo(res.data.responseBody);
      })
      .catch((error) => {
        navigate("/");
      });
  };

  useEffect(() => {
    // @ts-ignore
    handleUserInfo();
  }, []);

  // const handleFileChange = (e) => {
  //   setUserProfileImgHook(encodeFileToBase64(e.target.files[0]));
  // };

  const handleFileChange = (e) => {
    setUpdateUserProfileImg(e.target.files[0]);
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    return new Promise((resolve) => {
      reader.onload = () => {
        setUserProfileImgHook(reader.result); // 파일의 컨텐츠
        resolve();
      };
    });
  };
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

  const handleUpdateInfo = async (event) => {
    if (password === "") {
      alert("비밀번호를 입력해주세요");
      return;
    }

    if (password !== passwordConfirm) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    const fomData = new FormData();

    if (updateUserProfileImg !== "" && userProfilePreview !== "") {
      fomData.append("image", updateUserProfileImg);
    } else {
      fomData.append("image", userInfo.userProfileImgUrl);
    }

    const updatedUserInfo = {
      userEmail: email === "" ? userInfo.userEmail : email,
      password: password,
    };

    fomData.append("memberUpdateRequest", new Blob([JSON.stringify(updatedUserInfo)], { type: "application/json" }));

    try {
      setUpdateIsLoading(true);
      const res = await axios({
        url: "/api/v1/users",
        method: "POST",
        withCredentials: true,
        credentials: "include",
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
        data: fomData,
        "Content-Type": "multipart/form-data",
      });

      setUpdateIsLoading(false);
      dispatch(setUserProfile("데이터변경"));
      setCurrModalContent("수정이 완료되었습니다.");
      setNotiModal(true);
    } catch (error) {
      setCurrModalContent("수정 실패하였습니다.");
      // navigate("/authentication/sign-in");
    }
    // axios({
    //   url: "/api/v1/users",
    //   method: "POST",
    //   withCredentials: true,
    //   credentials: "include",
    //   headers: {
    //     Authorization: "Bearer " + sessionStorage.getItem("token"),
    //   },
    //   data: fomData,
    //   "Content-Type": "multipart/form-data",
    // })
    //   .then((res) => {
    //     dispatch(setUserProfile(res.data.responseBody.userProfileImgUrl));
    //   })
    //   .catch((error) => {
    //     setCurrModalContent("수정 실패하였습니다.");
    //     // navigate("/authentication/sign-in");
    //   });

    // setCurrModalContent("수정이 완료되었습니다.");
    // setNotiModal(true);
  };

  async function handleDelete() {
    handleAskModal();
    axios({
      url: "/api/v1/users",
      method: "DELETE",
      withCredentials: true,
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    })
      .then((res) => {
        setCurrModalContent("회원탈퇴가 완료되었습니다.");
        sessionStorage.removeItem("token");
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
              {userInfo.userProfileImgUrl === "" && userProfilePreview === "" && (
                <UserIcon>
                  <i className="bi bi-person-circle" />{" "}
                </UserIcon>
              )}

              {userInfo.userProfileImgUrl !== "" && userProfilePreview === "" && <ImageThumbnail src={userInfo.userProfileImgUrl} />}
              {userInfo.userProfileImgUrl !== "" && userProfilePreview !== "" && <ImageThumbnail src={userProfilePreview} />}
              {userInfo.userProfileImgUrl === "" && userProfilePreview !== "" && <ImageThumbnail src={userProfilePreview} />}

              <InputFile>
                <label htmlFor="formFile" className="form-label"></label>
                <input className="form-control" type="file" id="formFile" onChange={handleFileChange} />
              </InputFile>
            </LeftContainer>

            <RightContainer>
              <Form>
                <label>아이디</label>
                <ID className="mt-1">{userInfo.userName}</ID>
                {/*<label>이메일</label>*/}
                {/*<Input placeholder={userInfo.userEmail} type="email" name="password" onChange={handleEmailChange} />*/}
                <label className="mt-2">비밀번호</label>
                <Input className="mt-1" placeholder={"비밀번호"} type="password" name="password" onChange={handlePasswordChange} />
                <label className="mt-2">비밀번호 확인</label>
                <Input className="mt-1" placeholder={"비밀번호 확인"} type="password" name="password" onChange={handlePasswordConfirm} />
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
              {upDateLoading && <LoadingAniWithBackGround />}
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
  padding: 100px 0;
`;
const MemberContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;

  border: 1px solid rgba(220, 220, 220, 1 );
  border-radius: 8px;
  padding: 40px;
`;

const LeftContainer = styled.div`
  font-size: 100px;
  width: 40%;
  display: flex;
  flex-direction: column;
  align-items: center;
  
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
  padding: 50px 5px;
`;

const ID = styled.div`
  padding: 7px 12px;
`;

const ImageBox = styled.div`
  width: 380px;
  height: 220px;
  overflow: hidden;
`;

const ImageThumbnail = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  object-fit:cover;

`;
