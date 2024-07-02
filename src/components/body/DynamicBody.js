import styled from "styled-components";
import { useState, useEffect } from "react";
import axios from "axios";
import { useAppSelector } from "../../redux/hooks";
import Pagination from "../Pagination";
import RenderContent from "./RenderContent";
import BodyTitle from "./BodyTitle";
import LoadingAnimation from "../modal/LoadingAnimation";

function DynamicBody() {
  const { searchWord, orderCommand } = useAppSelector((state) => state.searchState);
  const [currPageNum, setCurrPageNum] = useState(0);
  const [totalPageNum, setTotalPageNum] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [titleCount, setTitleCount] = useState([]);
  const [posts, setPosts] = useState([]);

  const changePage = (currPageNum) => {
    setCurrPageNum(currPageNum);
  };

  const handleGetPosts = (pageNum) => {
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

  const handleGetSearchPosts = (pageNum, searchWord) => {
    axios({
      // url: `/api/v1/search?size=12&sort=${orderCommand}desc&page=` + pageNum + `&searchWord=` + searchWord,
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
    <>
      <RenderContent renderData={posts} currPageNum={currPageNum} title={"전체 게시물"} />
      <Pagination changePage={changePage} totalPageNum={totalPageNum} currPageNum={currPageNum} />
    </>
  );
}

export default DynamicBody;
