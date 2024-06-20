import { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import { useAppSelector } from "../../hooks";
import { useAppDispatch } from "../../hooks";
import { setOrderCommandTK } from "../../redux/dataSlice";
import { listData } from "../../ListOrderData";

interface TitleProps {
  renderData: any;
  title: string;
}

interface OrderType {
  command: string;
  order: string;
}

function BodyTitle({ renderData, title }: TitleProps) {
  const [currentTag, setCurrnetTag] = useState(0);
  const getSearchWord = useAppSelector((state) => state.searchState.searchWord);
  const dispatch = useAppDispatch();

  const handleTitle = (command: string, currentIdx: number) => {
    setCurrnetTag(currentIdx);
    dispatch(setOrderCommandTK(command));
  };

  useEffect(() => {
    setCurrnetTag(0);
  }, [getSearchWord]);

  return (
    <BodyTitleContainer>
      <SearchResult>
        {title} &nbsp;
        <SearchNum> {renderData.length !== 0 ? renderData : 0} </SearchNum> &nbsp; 개
      </SearchResult>
      <ListOrder>
        {listData.map((el: OrderType, idx: number) => {
          return (
            <Title key={idx} onClick={() => handleTitle(el.order, idx)} activeTag={idx === currentTag ? true : false}>
              {el.command}
            </Title>
          );
        })}
      </ListOrder>
    </BodyTitleContainer>
  );
}

export default BodyTitle;

const BodyTitleContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 15px;
`;

const SearchResult = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
`;

const ListOrder = styled.ul`
  display: flex;
`;

const Title = styled.li<{ activeTag: boolean }>`
  font-size: 14px;
  list-style-type: none;
  display: inline;
  padding: 0px 10px;
  border-left: 1px solid black;
  cursor: pointer;
  outline: 0 none;
  &:nth-child(1) {
    border-left: none;
  }
  ${(props) =>
    props.activeTag
      ? css`
          color: rgba(155, 79, 243, 0.98);
          font-weight: 600;
        `
      : "#000000"};
`;

const SearchTitle = styled.div`
  font-weight: 600;
  color: rgb(247, 0, 0);
`;

const SearchNum = styled.div`
  color: rgb(136, 136, 136);
`;
