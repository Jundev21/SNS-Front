import styled from "styled-components";
import {useEffect, useState} from "react";
import axios from "axios";
import {useAppSelector} from "../redux/hooks";
import RenderContent from "../components/body/RenderContent";
import BodyTitle from "../components/body/BodyTitle";
import LoadingAnimation from "../components/modal/LoadingAnimation";
import UsePagination from "../hook/UsePagination";
import PaginationButton from '../components/util/table-pagenation-button';

function Body() {
    const {searchWord, orderCommand} = useAppSelector((state) => state.searchState);
    const [isLoading, setIsLoading] = useState(true);
    const [titleCount, setTitleCount] = useState([]);
    const [posts, setPosts] = useState<any>([]);

    const {currentPage, totalPage, showPageNums, nextPage, prevPage, handlePageChange, loadPageInfo} =
        UsePagination()

    const handleGetPosts = (pageNum: any) => {
        axios({
            url: `/api/v1/board?size=12&sort=${orderCommand},desc&page=${pageNum-1}`,
            method: "GET",
        })
            .then((res) => {
                setIsLoading(false);
                setPosts(res.data.responseBody.content);
                setTitleCount(res.data.responseBody.totalElements);
                loadPageInfo(res.data.responseBody.totalPages);
            })
            .catch((error) => {
                // navigate("/authentication/sign-in");
            });
        window.scrollTo({top: 0, behavior: 'smooth'});

    };

    const handleGetSearchPosts = (pageNum: any, searchWord: String) => {
        axios({
            url: `/api/v1/board/searching/${searchWord}?size=12&sort=${orderCommand},desc&page=${pageNum-1}`,
            method: "GET",
        })
            .then((res) => {
                setIsLoading(false);
                setPosts(res.data.responseBody.content);
                setTitleCount(res.data.responseBody.totalElements);
                loadPageInfo(res.data.responseBody.totalPages);

            })
            .catch((error) => {
                // navigate("/authentication/sign-in");
            });
    };

    useEffect(() => {
        // @ts-ignore
        if (searchWord === "") {
            handleGetPosts(currentPage);
        } else {
            handleGetSearchPosts(currentPage, searchWord);
        }
    }, [searchWord, orderCommand, currentPage]);

    return (
        <BodyContainer>
            <BodyWrapper>
                {isLoading ? (
                    <LoadingAnimation/>
                ) : (
                    <>
                        <BodyTitle renderData={titleCount} currSearchWord={searchWord} title={"전체 게시물"}/>
                        <RenderContent renderData={posts} currPageNum={currentPage} title={"전체 게시물"}/>
                        <PaginationButton
                            showPageNums={showPageNums}
                            totalPage={totalPage}
                            handlePageChange={handlePageChange}
                            currentPage={currentPage}
                            nextPage={nextPage}
                            prevPage={prevPage}
                        />
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
