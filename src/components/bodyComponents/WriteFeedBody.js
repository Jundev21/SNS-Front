import styled from "styled-components";
import { useState, useEffect } from "react";
import axios from "axios";
import { useAppSelector } from "../../hooks";
import Pagination from "../Pagination";
import RenderContent from "./RenderContent";
import BodyTitle from "./BodyTitle";
import { useNavigate } from "react-router-dom";
import HoverModal from "components/modal/HoverModal";

function WriteFeedBody() {
  const [title, setTitle] = useState("");
  const [contents, setBody] = useState("");
  const [notiModal, setNotiModal] = useState(false);
  const [currModalContent, setCurrModalContent] = useState("");
  const navigate = useNavigate();

  const handleNotiModal = () => {
    setNotiModal((e) => !e);
  };

  const handleClose = () => {
    navigate("/");
  };

  const handleWritePost = (event) => {
    event.preventDefault();

    axios({
      url: "/api/v1/board",
      method: "POST",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: {
        title: title,
        contents: contents,
      },
    })
      .then((res) => {
        navigate("/");
      })
      .catch((error) => {
        setCurrModalContent("게시물 작성에 실패하였습니다.");
        handleNotiModal();
      });
  };

  return (
    <BodyContainer>
      <BodyWrapper>
        <h3>우리 모두 하나가 되는 공간</h3>
        <form>
          <div className="form-group pt-4">
            <label htmlFor="title1" className="d-block pt-2">
              <h6>제목</h6>
            </label>
            <input type="email" className="form-control p-2" id="title1" placeholder="제목을 입력해주세요." onChange={(v) => setTitle(v.target.value)} />
          </div>
          <div className="form-group pt-3">
            <label htmlFor="tag1" className="d-block pt-2">
              <h6>태그</h6>
            </label>
            <select className="form-control p-2" id="tag1" disabled>
              <option>preparing</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </select>
          </div>

          <div className="form-group pt-3">
            <label htmlFor="content1" className="d-block pt-2">
              <h6>내용</h6>
            </label>
            <textarea className="form-control mh-100" id="content1" rows="8" placeholder="내용을 입력해주세요." onChange={(v) => setBody(v.target.value)}></textarea>
          </div>
          <div className="d-grid gap-2 d-md-block mt-4 d-md-flex justify-content-md-end">
            <Button type="Button" className="btn btn-outline-danger px-3 me-md-2" onClick={handleClose}>
              취소
            </Button>
            {contents.length === 0 || title.length === 0 ? (
              <Button type="button" className="btn btn-secondary px-3" disabled>
                등록
              </Button>
            ) : (
              <Button type="button" className="btn btn-primary px-3" onClick={handleWritePost}>
                등록
              </Button>
            )}
          </div>
        </form>
      </BodyWrapper>
      {notiModal && <HoverModal handleModal={handleNotiModal} currModalContent={currModalContent} />}
    </BodyContainer>
  );
}

export default WriteFeedBody;

const BodyContainer = styled.div`
  width: 100%;
`;

const BodyWrapper = styled.div`
  width: 900px;
  margin: auto;
  padding: 30px 0;
`;

const Button = styled.button`
  cursor: pointer;
`;
