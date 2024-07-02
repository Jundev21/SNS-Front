import React from "react";
import styled from "styled-components";

interface AutoCompType {
  searchHistory: Array<string>;
  handleTagName: (word: string) => void;
  setSearchHistory: React.Dispatch<React.SetStateAction<string[]>>;
}

function HistoryList({ searchHistory, handleTagName, setSearchHistory }: AutoCompType) {
  const handleClear = () => {
    sessionStorage.clear();
    let getSessionData = sessionStorage.getItem("SearchHistory");
    if (!getSessionData) {
      setSearchHistory([]);
    }
  };

  const handleDeleteList = (idx: number) => {
    let getSessionData = sessionStorage.getItem("SearchHistory");

    if (getSessionData) {
      let historyArr: Array<string> = JSON.parse(getSessionData);
      let filterData = historyArr.filter((el: string, originIdx: number) => {
        return originIdx !== idx;
      });
      sessionStorage.setItem("SearchHistory", JSON.stringify(filterData));

      setSearchHistory(filterData);
    }
  };

  return (
    <HistoryContainer>
      <HistoryTitle className="text-primary">최근 검색어</HistoryTitle>
      <ListContainer>
        {searchHistory.length === 0 ? (
          <Warining>최근 검색어가 없습니다.</Warining>
        ) : (
          <>
            {searchHistory.map((el: string, idx: number) => {
              return (
                <ContentContainer key={(idx * Math.random()).toString() + el}>
                  <TagName onClick={() => handleTagName(el)}>{el}</TagName>
                  <span className="text-primary" onClick={() => handleDeleteList(idx)}>
                    X
                  </span>
                </ContentContainer>
              );
            })}
          </>
        )}
      </ListContainer>
      <DeleteHistory className="text-primary" onClick={() => handleClear()}>
        전체 기록 삭제
      </DeleteHistory>
    </HistoryContainer>
  );
}

export default HistoryList;

const TagName = styled.div`
  cursor: pointer;
  flex: 1 1;
`;

const Warining = styled.div`
  text-align: center;
  font-weight: 400;
`;

const ContentContainer = styled.div`
  padding: 5px 15px;
  display: flex;

  &:hover {
    background-color: rgb(240, 240, 235);
  }

  > span {
    color: rgb(194, 194, 194);
    cursor: pointer;
  }
`;

const ListContainer = styled.div`
  padding-bottom: 20px;
`;

const HistoryContainer = styled.div`
  position: relative;
  height: 100%;
`;

const HistoryTitle = styled.div`
  padding: 10px 10px;
  margin-bottom: 10px;
  color: gray;
  text-align: center;
  border-bottom: 1px solid rgb(217, 217, 217);
`;

const DeleteHistory = styled.div`
  position: absolute;
  left: 0;
  text-align: center;
  bottom: 0;
  right: 0;
  font-size: 14px;
  padding: 10px 0;
  cursor: pointer;
  color: gray;
  border-top: 1px solid rgb(217, 217, 217);

  &:hover {
    background-color: rgb(240, 240, 235);
  }
`;
