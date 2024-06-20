import styled from "styled-components";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useAppDispatch } from "../../hooks";
import { setSearchWordTK, setOrderCommandTK } from "../../redux/dataSlice";
import RenderAutoCom from "../searchBarComponents/RenderAutoCom";

function SearchBar() {
  const [searchWord, setSearchWord] = useState("");
  const [autoComplete, setAutoComplete] = useState([]);
  const [searchList, setSearchList] = useState(false);
  const textInput = useRef<HTMLInputElement>(null);

  const dispatch = useAppDispatch();

  // useEffect(() => {
  //   const autoData = async () => {
  //     const liveWord = await axios.get(
  //       `https://api.stg-bunjang.co.kr/api/1/search/suggests_keyword.json?q=${searchWord}&type=product&v=2`
  //     );
  //     setAutoComplete(liveWord.data.keywords);
  //   };
  //   autoData();
  // }, [searchWord]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWord(e.target.value);
  };

  const handleInput = () => {
    setSearchList(true);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement> | null) => {
    if (e) {
      e.preventDefault();
    }

    if (searchWord !== "") {
      let getSessionData = sessionStorage.getItem("SearchHistory");

      if (!getSessionData) {
        sessionStorage.setItem("SearchHistory", JSON.stringify([searchWord]));
      } else {
        let historyArr: Array<string> = JSON.parse(getSessionData);

        if (historyArr.length > 6) {
          historyArr.pop();
        }
        historyArr.unshift(searchWord);
        let newData = new Set(historyArr);
        let makeArr = [...newData];
        sessionStorage.setItem("SearchHistory", JSON.stringify(makeArr));
      }

      setSearchList(false);
      dispatch(setOrderCommandTK("date"));
      dispatch(setSearchWordTK(searchWord));
    }
  };

  const handleClear = () => {
    if (textInput.current !== null) {
      textInput.current.focus();
    }
    setSearchList(true);
    setSearchWord("");
  };

  return (
    <SearchContainer>
      <SearchWrapper>
        <SearchForm onSubmit={handleSubmit}>
          <FormInput ref={textInput} type="text" onChange={handleChange} placeholder="검색" value={searchWord} onClick={handleInput} />

          {searchList === true && <RenderAutoCom searchWord={searchWord} autoComplete={autoComplete} setSearchWord={setSearchWord} setSearchList={setSearchList} />}
        </SearchForm>
        {searchWord !== "" && <ClearInput onClick={() => handleClear()}>X</ClearInput>}
        <div className="bi bi-search" onClick={() => handleSubmit(null)}></div>
      </SearchWrapper>
    </SearchContainer>
  );
}

export default SearchBar;

const SearchContainer = styled.div`
  position: relative;
  min-width: 280px;
  border: 1.4px solid #356ddc;
  border-radius: 5px;
`;

const SearchWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 15px;

  > form {
    flex: 1;
  }

  > img {
  }
`;

const SearchForm = styled.form``;

const FormInput = styled.input`
  width: 100%;
  height: 36px;
  border: none;
  outline: none;
  color: black;
`;

const ClearInput = styled.div`
  padding: 0 5px;
  color: rgb(194, 194, 194);
  cursor: pointer;
`;

const Img = styled.img`
  color: black;
  width: 16px;
  height: 16px;
  cursor: pointer;
`;
