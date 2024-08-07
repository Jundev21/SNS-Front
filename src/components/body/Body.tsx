import styled from "styled-components";
import { useState, useEffect } from "react";
import axios from "axios";
import { useAppSelector } from "../../redux/hooks";
import Pagination from "../Pagination";
import RenderContent from "./RenderContent";
import BodyTitle from "./BodyTitle";
import LoadingAnimation from "../modal/LoadingAnimation";
import DynamicBody from "./DynamicBody";

function Body() {
  const { searchWord, orderCommand } = useAppSelector((state) => state.searchState);
  const [currPageNum, setCurrPageNum] = useState(0);
  const [totalPageNum, setTotalPageNum] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [titleCount, setTitleCount] = useState([]);
  const [posts, setPosts] = useState<any>([]);

  const changePage = (currPageNum: any) => {
    setCurrPageNum(currPageNum);
  };

  const handleGetPosts = (pageNum: any) => {
    axios({
      url: `/api/v1/board?size=12&sort=${orderCommand},desc&page=` + pageNum,
      method: "GET",
    })
      .then((res) => {
        setIsLoading(false);
        setPosts(res.data.responseBody.content);
        setTitleCount(res.data.responseBody.totalElements);
        setTotalPageNum(res.data.responseBody.totalPages);
      })
      .catch((error) => {
        // navigate("/authentication/sign-in");
      });
  };

  const handleGetSearchPosts = (pageNum: any, searchWord: String) => {
    axios({
      url: `/api/v1/board/searching/${searchWord}?size=12&sort=${orderCommand},desc&page=` + pageNum,
      method: "GET",
    })
      .then((res) => {
        setIsLoading(false);
        setPosts(res.data.responseBody.content);
        setTitleCount(res.data.responseBody.totalElements);
        setTotalPageNum(res.data.responseBody.totalPages);
      })
      .catch((error) => {
        // navigate("/authentication/sign-in");
      });
  };

  useEffect(() => {
    // @ts-ignore
    if (searchWord === "") {
      handleGetPosts(currPageNum);
    } else {
      handleGetSearchPosts(currPageNum, searchWord);
    }
  }, [searchWord, orderCommand, currPageNum]);

  return (
    <BodyContainer>
      <BodyWrapper>
        {isLoading ? (
          <LoadingAnimation />
        ) : (
          <>
            <BodyTitle renderData={titleCount} currSearchWord={searchWord} title={"전체 게시물"} />
            <RenderContent renderData={posts} currPageNum={currPageNum} title={"전체 게시물"} />
            <Pagination changePage={changePage} totalPageNum={totalPageNum} currPageNum={currPageNum} />
          </>
        )}
      </BodyWrapper>
    </BodyContainer>
  );
}

export default Body;

const BodyContainer = styled.div`
  width: 100%;
  // height: 60vh;
`;

const BodyWrapper = styled.div`
  height: 100%;
  width: 1200px;
  margin: auto;
  padding: 30px 0;
`;
