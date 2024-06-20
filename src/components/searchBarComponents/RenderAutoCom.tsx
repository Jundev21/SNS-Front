import styled from "styled-components";
import React, { useEffect, useState, useRef } from "react";
import { useAppDispatch } from "../../hooks";
import { setSearchWordTK, setOrderCommandTK } from "../../redux/dataSlice";
import AutoList from "./AutoList";
import HistoryList from "./HistoryList";

interface AutoCompType {
  autoComplete: {
    name: string;
  }[];
  setSearchWord: React.Dispatch<React.SetStateAction<string>>;
  setSearchList: React.Dispatch<React.SetStateAction<boolean>>;
  searchWord: string;
}

function RenderAutoCom({
  autoComplete,
  searchWord,
  setSearchWord,
  setSearchList,
}: AutoCompType) {
  const [searchHistory, setSearchHistory] = useState<Array<string>>([]);
  const dispatch = useAppDispatch();
  const layOutArea = useRef<HTMLDivElement>(null);
  
  const handleTagName = (word: string) => {
    let getSessionData = sessionStorage.getItem("SearchHistory");

    if (!getSessionData) {
      sessionStorage.setItem("SearchHistory", JSON.stringify([word]));
    } else {
      let historyArr: Array<string> = JSON.parse(getSessionData);

      if(historyArr.length>6){
        historyArr.pop();
      }
      historyArr.unshift(word);
      let newData = new Set(historyArr);
      let makeArr = [...newData];
      sessionStorage.setItem("SearchHistory", JSON.stringify(makeArr));
    }

    setSearchList(false);
    setSearchWord(word);
    dispatch(setSearchWordTK(word));
    dispatch(setOrderCommandTK("date"));
  };

  useEffect(() => {
    const initSessionData = () => {
      let getSessionData = sessionStorage.getItem("SearchHistory");

      if (getSessionData) {
        let historyArr: Array<string> = JSON.parse(getSessionData);
        setSearchHistory(historyArr);
      }
    };
    initSessionData();

    return () => {
      initSessionData();
    };
  }, []);

  useEffect(() => {
    let outSideArea = (e: any) => {
      if (layOutArea.current !== null) {
        if (!layOutArea.current.contains(e.target)) {
          setSearchList(false);
        }
      }
    };

    document.addEventListener("mousedown", outSideArea);

    return () => {
      document.removeEventListener("mousedown", outSideArea);
    };
  });

  return (
    <SearchList ref={layOutArea}>
      {searchWord === "" ? (
        <HistoryList
          searchHistory={searchHistory}
          handleTagName={handleTagName}
          setSearchHistory={setSearchHistory}
        />
      ) : (
        <AutoList
          autoComplete={autoComplete}
          handleTagName={handleTagName}
          searchWord={searchWord}
        />
      )}
    </SearchList>
  );
}

export default RenderAutoCom;

const SearchList = styled.div`
  position: absolute;
  margin-top: 20px;
  border: 1px solid rgb(217, 217, 217);
  background: rgb(255, 255, 255);
  width: 100%;
  left: 0;
  height: 330px;
  max-height: 500px;
  overflow-y: auto;
`;
