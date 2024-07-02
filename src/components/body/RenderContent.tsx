import styled from "styled-components";
import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import noImage from "../../img/noImage.jpg";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
interface DataType {
  name: string;
  product_image: string;
  price: string;
  body: any;
  title: any;
  basicUserInfoResponse: any;
  contents: any;
  createdTime: any;
}

function RenderContent({ renderData, currPageNum, title }: any) {
  const navigate = useNavigate();

  const HandleCard = (data: DataType) => {
    if (title.includes("나의")) {
      navigate("/detail/my/feed", { state: data });
      return;
    }
    navigate("/detail/feed", { state: data });
  };
  return (
    <>
      {renderData.length === 0 ? (
        <Warnning> {title} 이 비어있습니다.</Warnning>
      ) : (
        <CardContainer>
          <div className="row row-cols-3 row-cols-md-4 g-4">
            {renderData.map((el: any, idx: number) => {
              return (
                <CardWrapper key={idx} className="col" onClick={() => HandleCard(el)}>
                  <div className="card baseBlock">
                    <div className="card-body">
                      <Title className="card-title">{el.title}</Title>
                      <h6 className="card-subtitle mb-2 text-body-secondary">{el.basicUserInfoResponse.userName}</h6>
                      <CardContent className="card-text">{el.contents}</CardContent>
                      <SubInfo>
                        <SubEventDate>{dayjs(el.createdTime).format("YYYY.MM.DD HH:mm")}</SubEventDate>
                        <div>
                          <SubEvent className="bi bi-hand-thumbs-up fs-6">
                            <SubEvent>{el.totalFavoriteNums}</SubEvent>
                          </SubEvent>
                          <SubEvent className="bi bi-chat-dots-fill">
                            <SubEvent>{el.totalCommitNums}</SubEvent>
                          </SubEvent>
                        </div>
                      </SubInfo>
                    </div>
                  </div>
                </CardWrapper>
              );
            })}
          </div>
        </CardContainer>
      )}
    </>
  );
}

export default RenderContent;

const ProductImg = styled.div`
  width: 243px;
  height: 210px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
`;

const ProductEle = styled.div`
  flex: 1 1;
  width: 243px;
  height: 310px;
  margin-right: 11px;
  margin-bottom: 11px;
  background-color: rgb(255, 255, 255);
  border: 1px solid rgb(238, 238, 238);
  cursor: pointer;
`;

const ProductInfo = styled.div`
  padding: 15px 10px;
  height: 80px;
`;

const Warnning = styled.div`
  height: 50vh;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
`;

const Title = styled.h5`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding-bottom: 10px;
`;

const Price = styled.div`
  font-weight: bold;
`;

const SubInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const SubEventDate = styled.div`
  margin-bottom: 4px;
`;
const SubEvent = styled.span`
  display: inline-block;
  padding-left: 10px;
`;

const CardContainer = styled.div``;

const CardWrapper = styled.div`
  height: 100%;
`;

const CardContent = styled.div`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  max-height: 10em;
  line-height: 1.5em;
  padding-bottom: 10px;
`;
