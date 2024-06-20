import styled from "styled-components";
import axios from "axios";
import dayjs from "dayjs";

import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import HoverModal from "components/modal/HoverModal";

function EditMyWriteFeedBody() {
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
  const [notiModal, setNotiModal] = useState(false);
  const [currModalContent, setCurrModalContent] = useState("");

  const navigate = useNavigate();
  const handleNotiModal = () => {
    setNotiModal((e) => !e);
  };

  const handleLikePost = (event) => {
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
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => {
        setComments(res.data.responseBody);
        setCommentDate(res.data.createdTime);
        setTotalPage(res.data.boardGetResponse.totalPages);
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
        setComment("");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateWritePost = (data) => {
    axios({
      url: "/api/v1/board/" + id,
      method: "PUT",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: {
        title: title,
        content: body,
      },
    })
      .then((res) => {
        navigate("/detail/my/feed", { state: { ...data, title: title, contents: body } });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const CancleEdit = () => {
    navigate("/detail/my/feed", { state: state });
  };

  const handleDelete = (id) => {
    axios({
      url: "/api/v1/board/" + id,
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => {
        setCurrModalContent("게시물이 삭제되었습니다.");
        navigate("/my/feed");
        setNotiModal(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    handleGetComments();
    handleLikeCounts();
  }, []);

  return (
    <BodyContainer>
      <BodyWrapper>
        <MainContent>
          <MainSubTitle>나의 게시글 수정</MainSubTitle>
          <TitleContainer>
            <input type="email" className="form-control p-2" id="title1" placeholder="제목을 입력해주세요." onChange={(v) => setTitle(v.target.value)} value={title} />
            <SubtitleContainer>
              <SubTitle> {writer}</SubTitle>
              <SubTitle>{date}</SubTitle>
            </SubtitleContainer>
          </TitleContainer>
          <textarea className="form-control mh-100" id="content1" rows="8" placeholder="내용을 입력해주세요." onChange={(v) => setBody(v.target.value)} value={body}></textarea>
          <LikesBtn onClick={handleLikePost}>
            <p className="bi bi-hand-thumbs-up fs-6">
              <LikeNumber>{likes}</LikeNumber>
            </p>
          </LikesBtn>
        </MainContent>
        <EditBtn>
          <Edit type="button" className="btn btn-primary px-3  btn-sm me-md-2" onClick={CancleEdit}>
            취소
          </Edit>
          <Edit type="button" className="btn btn-primary px-3  btn-sm me-md-2" onClick={() => updateWritePost(state)}>
            수정 완료
          </Edit>
          <Delete type="button" className="btn btn-outline-danger btn-sm px-3" onClick={() => handleDelete(id)}>
            삭제
          </Delete>
        </EditBtn>

        <CommentContainer>
          <MainSubTitle>댓글</MainSubTitle>

          {comments.map((comment) => (
            <CommentsData>
              <span>
                <i class="bi bi-person-circle"></i>
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

        {notiModal && <HoverModal handleModal={handleNotiModal} currModalContent={currModalContent} />}
      </BodyWrapper>
    </BodyContainer>
  );
}

export default EditMyWriteFeedBody;

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
