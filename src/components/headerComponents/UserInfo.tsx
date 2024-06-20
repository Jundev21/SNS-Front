import React from "react";
import styled from "styled-components";

interface dataType {
  title: string;
}

const userData = [
  { title: "로그인" },
  { title: "마이페이지" },
  // { title: "번개톡" },
];

function UserInfo() {
  return (
    <InfoContainer>
      {userData.map((el: dataType, idx: number) => {
        return <Title key={idx}> {el.title}</Title>;
      })}
    </InfoContainer>
  );
}

export default UserInfo;

const InfoContainer = styled.ul`
  padding: 0;
  width: 250px;
  display: flex;
  justify-content: center;
  align-items: center;
  list-style-type: none;
`;

const Title = styled.div`
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
`;
