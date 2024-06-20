import styled from "styled-components";
import Comment from "../comment/Comment";
import axios from "axios";
import dayjs from "dayjs";
import HoverModal from "components/modal/HoverModal";

import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import AskModal from "components/modal/AskModal";

function MyDetailFeedBody() {
  const { state } = useLocation();
  const [page, setPage] = useState(0);
  const [title, setTitle] = useState(state.title);
  const [writer, setWriter] = useState(state.basicUserInfoResponse.userName);
  const [body, setBody] = useState(state.contents);
  const [date, setDate] = useState(dayjs(state.createdTime).format("YYYY-MM-DD HH:mm"));
  const [commentDate, setCommentDate] = useState();

  const [id, setId] = useState(state.id);

  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [comment, setComment] = useState();
  const [isClicked, setIsClicked] = useState(state.isClicked);
  const [notiModal, setNotiModal] = useState(false);
  const [currModalContent, setCurrModalContent] = useState("");
  const [askDelete, setAskDelete] = useState(false);

  const navigate = useNavigate();

  const handleNotiModal = () => {
    setNotiModal((e) => !e);
  };

  const handleLikePost = (event) => {
    if (!localStorage.getItem("token")) {
      handleNotiModal();
      return;
    }
    if (isClicked) {
      axios({
        url: "/api/v1/favorite/board/" + id,
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
        .then((res) => {
          handleLikeCounts();
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      axios({
        url: "/api/v1/favorite/board/" + id,
        method: "POST",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
        .then((res) => {
          handleLikeCounts();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleLikeCounts = (event) => {
    axios({
      url: "/api/v1/favorite/board/" + id,
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => {
        setLikes(res.data.responseBody.favoriteNumber);
        setIsClicked(res.data.responseBody.isClicked);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const changePage = (pageNum) => {
    setPage(pageNum);
    handleGetComments(pageNum);
  };

  const handleGetComments = (pageNum, event) => {
    axios({
      // url: '/api/v1/board/' + id + '/comments?size=5&sort=id&page=' + pageNum,
      url: "/api/v1/user/board/" + id + "/comment",
      method: "GET",
      // headers: {
      //   Authorization: "Bearer " + localStorage.getItem("token"),
      // },
    })
      .then((res) => {
        setComments(res.data.responseBody);
        setCommentDate(res.data.createdTime);
        // setTotalPage(res.data.boardGetResponse.totalPages);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleWriteComment = (pageNum, event) => {
    if (!localStorage.getItem("token")) {
      handleNotiModal();
      return;
    }
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
        setComment("");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleModify = () => {
    navigate("/edit/my/feed", { state: state });
  };

  const handlAskModal = () => {
    setCurrModalContent("삭제하시겠습니까?");
    setNotiModal(true);
  };

  const handleDelete = () => {
    axios({
      url: "/api/v1/board/" + id,
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => {
        navigate("/my/feed");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    handleGetComments();
    handleLikeCounts();
  }, [isClicked, comment]);

  return (
    <BodyContainer>
      <BodyWrapper>
        <MainContent>
          <MainSubTitle>나의 게시글 보기</MainSubTitle>
          <TitleContainer>
            <h3> {title}</h3>
            <SubtitleContainer>
              <SubTitle> {writer}</SubTitle>
              <SubTitle>{date}</SubTitle>
            </SubtitleContainer>
          </TitleContainer>
          <ContentContainer>{body}</ContentContainer>
          <LikesBtn onClick={handleLikePost}>
            {isClicked ? (
              <p className="bi bi-hand-thumbs-up-fill fs-6">
                <LikeNumber>{likes}</LikeNumber>
              </p>
            ) : (
              <p className="bi bi-hand-thumbs-up fs-6">
                <LikeNumber>{likes}</LikeNumber>
              </p>
            )}
          </LikesBtn>
        </MainContent>
        <EditBtn>
          <Edit type="button" className="btn btn-primary px-3  btn-sm me-md-2" onClick={handleModify}>
            수정
          </Edit>
          <Delete type="button" className="btn btn-outline-danger btn-sm px-3" onClick={handlAskModal}>
            삭제
          </Delete>
        </EditBtn>

        <CommentContainer>
          <MainSubTitle>댓글</MainSubTitle>

          {comments.map((comment, idx) => (
            <CommentsData key={idx}>
              <span>
                <i className="bi bi-person-circle"></i>
              </span>
              <CommentUser> {comment.userInfo.userName}</CommentUser>
              <div> {comment.commentInfo.content}</div>
              <CommentDate>{dayjs(comment.commentInfo.updateDate).format("YYYY.MM.DD HH:mm")}</CommentDate>
            </CommentsData>
          ))}

          <CommentContainer>
            <form className="form-group  mb-2 row">
              <div className="form-group col">
                <textarea value={comment} className="form-control" id="inputPassword2" placeholder="댓글 추가" onChange={(v) => setComment(v.target.value)}></textarea>
              </div>
              <button type="button" className="btn btn-primary col-1" onClick={handleWriteComment}>
                등록
              </button>
            </form>
          </CommentContainer>
        </CommentContainer>
        {notiModal && <AskModal handleModal={handleNotiModal} currModalContent={currModalContent} activeAxios={handleDelete} />}
      </BodyWrapper>
    </BodyContainer>
  );
}

export default MyDetailFeedBody;

const BodyContainer = styled.div`
  width: 100%;
`;

const BodyWrapper = styled.div`
  width: 900px;
  margin: auto;
  padding: 30px 0;
`;

const TitleContainer = styled.div`
  margin-top: 30px;
`;

const ContentContainer = styled.div`
  margin-top: 50px;
`;

const SubtitleContainer = styled.div`
  margin-top: 30px;
  text-align: right;
`;

const SubTitle = styled.span`
  display: inline-block;
  padding-left: 20px;
`;

const CommentContainer = styled.div`
  margin-top: 50px;
`;

const CommentsData = styled.div`
  padding: 20px 0;
  border-bottom: 1px solid rgb(238, 238, 238);
`;

const MainSubTitle = styled.div`
  font-size: 12px;
  border-bottom: 1px solid rgb(238, 238, 238);
  padding-bottom: 9px;
  margin-bottom: 9px;
`;

const LikesBtn = styled.div`
  margin-top: 40px;
  font-size: 6px;
  text-align: right;
  cursor: pointer;
`;

const MainContent = styled.div`
  //   border-bottom: 1px solid rgb(238, 238, 238);
  //   padding-bottom: 40px;
`;

const CommentDate = styled.div`
  font-size: 12px;
  color: #999;
  margin: 10px 0;
`;
const CommentUser = styled.span`
  font-size: 16px;
`;

const LikeNumber = styled.span`
  display: inline-block;
  margin-left: 5px;
`;

const EditBtn = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const Edit = styled.button``;

const Delete = styled.button``;
