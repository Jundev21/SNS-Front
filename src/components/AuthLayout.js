import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import HoverModal from "./modal/HoverModal";

const AuthLayout = () => {
  const navigate = useNavigate();
  const [notiModal, setNotiModal] = useState(false);
  const [currModalContent, setCurrModalContent] = useState("로그인을 해주세요");

  const handleNotiModal = () => {
    setNotiModal((e) => !e);

    if (notiModal) {
      navigate("/");
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      handleNotiModal();
      // navigate("/");
    }
  }, [localStorage.getItem("token")]);

  return <div>{notiModal ? <HoverModal handleModal={handleNotiModal} currModalContent={currModalContent} /> : <Outlet />}</div>;
};

export default AuthLayout;
