import styled, {css} from "styled-components";

type PageInfoProps = {
    currentPage: number
    handlePageChange: (page: number) => void
    totalPage: number
    showPageNums: number[]
    nextPage: () => void
    prevPage: () => void
}

interface PageItemProps {
    active: boolean;
}

export default function PaginationButton({
                                             currentPage,
                                             showPageNums,
                                             handlePageChange,
                                             totalPage,
                                             nextPage,
                                             prevPage,
                                         }: PageInfoProps) {
    return (

        <PageNationContainer>
            {totalPage !== 0 && (
                <nav aria-label="Page navigation example">
                    <ul className="pagination">
                        <li className="page-item">
              <span className="page-link" aria-label="Previous" onClick={prevPage}>
                <span aria-hidden="true">&laquo;</span>
              </span>
                        </li>
                        {showPageNums.map((page, idx) => (
                            <PageItem key={idx} className="page-link"  active={currentPage === page} onClick={() => handlePageChange(page)}>
                                    {page}
                            </PageItem>
                        ))}
                        <li className="page-item">
              <span className="page-link" aria-label="Next" onClick={nextPage}>
                <span aria-hidden="true">&raquo;</span>
              </span>
                        </li>
                    </ul>
                </nav>
            )}
        </PageNationContainer>
    )
}


const PaginationContianer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    > ul {
        padding: 0;
    }
`;

const PageItem = styled.li<PageItemProps>`
    cursor: pointer;
    color: ${({ active }) => (active ? 'white' : 'black')};
    background-color: ${({ active }) => (active ? '#59B9EA' : 'transparent')};
`;

const PageNumber = styled.li`
    color:black;
`;

const Navi = styled.span`
    cursor: pointer;

    &:hover {
        color: rgb(247, 0, 0);
    }
`;

const PageNationContainer = styled.div`
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: end;
    margin-top: 50px;
`;
