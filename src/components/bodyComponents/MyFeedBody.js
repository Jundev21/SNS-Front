import styled from "styled-components";
import { useState, useEffect } from "react";
import axios from "axios";
import { useAppSelector } from "../../hooks";
import Pagination from "../Pagination";
import RenderContent from "./RenderContent";
import BodyTitle from "./BodyTitle";
import LoadingAnimation from "components/modal/LoadingAnimation";

function MyFeedBody() {
  const { searchWord, orderCommand } = useAppSelector((state) => state.searchState);
  const [currPageNum, setCurrPageNum] = useState(0);
  const [totalPageNum, setTotalPageNum] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [titleCount, setTitleCount] = useState([]);
  const [page, setPage] = useState(0);
  const [render, setRender] = useState(false);
  const [posts, setPosts] = useState([]);
  const [totalPage, setTotalPage] = useState(0);

  const changePage = (pageNum) => {
    setPage(pageNum);
    // @ts-ignore
    handleGetPosts(pageNum);
  };

  const handleGetPosts = (pageNum) => {
    axios({
      url: `/api/v1/board/user?size=10&sort=${orderCommand}&page=` + pageNum,
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => {
        setIsLoading(false);
        setPosts(res.data.responseBody.content);
        setTitleCount(res.data.responseBody.totalElements);
        setTotalPage(res.data.responseBody.totalPages);
      })
      .catch((error) => {
        // navigate("/authentication/sign-in");
      });
  };

  useEffect(() => {
    // @ts-ignore
    handleGetPosts(currPageNum);
  }, [searchWord, orderCommand, currPageNum]);

  return (
    <BodyContainer>
      <BodyWrapper>
        {isLoading ? (
          <LoadingAnimation />
        ) : (
          <>
            <BodyTitle renderData={titleCount} title={"나의 게시물"} handleGetPosts={handleGetPosts} />
            <RenderContent renderData={posts} currPageNum={currPageNum} title={"나의 게시물"} />
            <Pagination changePage={changePage} totalPageNum={totalPageNum} currPageNum={currPageNum} />
          </>
        )}
      </BodyWrapper>
    </BodyContainer>
  );
}

export default MyFeedBody;

const BodyContainer = styled.div`
  width: 100%;
`;

const BodyWrapper = styled.div`
  width: 1200px;
  margin: auto;
  padding: 30px 0;
`;
