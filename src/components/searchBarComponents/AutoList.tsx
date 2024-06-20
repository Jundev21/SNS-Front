import React from "react";
import styled from "styled-components";

interface AutoCompType {
  autoComplete: {
    name: string;
  }[];
  handleTagName: (word: string) => void;
  searchWord: string;
}

interface DataType {
  name: string;
}
function AutoList({ autoComplete, handleTagName, searchWord }: AutoCompType) {
  return (
    <>
      {autoComplete.length !== 0 ? (
        <SearchingContainer>
          {autoComplete.map((el: DataType, idx: number) => {
            return (
              <TagName key={idx} onClick={() => handleTagName(el.name)}>
                {el.name}
              </TagName>
            );
          })}
        </SearchingContainer>
      ) : (
        <SearchingContainer onClick={() => handleTagName(searchWord)}>
          <div>
            <TypeSearching> "{searchWord}" </TypeSearching> &nbsp; 검색하기
          </div>
        </SearchingContainer>
      )}
    </>
  );
}

export default AutoList;

const TagName = styled.div`
  padding: 3px 15px;
`;

const TypeSearching = styled.span`
  color: gray;
  cursor: pointer;
  &:hover {
    background-color: rgb(240, 240, 235);
  }
`;

const SearchingContainer = styled.div`
  height: 100%;
  > div {
    padding: 10px 10px;
    cursor: pointer;
    &:hover {
      background-color: rgb(240, 240, 235);
    }
  }
`;
