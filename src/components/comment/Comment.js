import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import dayjs from "dayjs";
import { useState, useEffect } from "react";

function Comment({ state, handleGetComments }) {
  const [comments, setComments] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [comment, setComment] = useState();
  const [id, setId] = useState(state.id);

  const handleWriteComment = (pageNum, event) => {
    axios({
      url: "/api/v1/user/board/" + id + "/comment",
      method: "POST",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: {
        content: comment,
      },
    })
      .then((res) => {
        handleGetComments();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <CommentContainer>
      <form className="form-group  mb-2 row">
        <div className="form-group col">
          <textarea className="form-control" id="inputPassword2" placeholder="댓글 추가" onChange={(v) => setComment(v.target.value)} />
        </div>
        <button type="submit" className="btn btn-primary col-1">
          등록
        </button>
      </form>
    </CommentContainer>
  );
}

export default Comment;

const CommentContainer = styled.div`
  margin-top: 30px;
`;
