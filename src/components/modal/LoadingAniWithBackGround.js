import React from "react";
import styled from "styled-components";

function LoadingAnimation() {
  return (
    <ModalOverlay>
      <ModalWrapper>
        <ModalContent>
          <LoadingContainer>
            <div className="d-flex align-items-center justify-content-center h-100">
              <div className="spinner-border text-primary" role="status" aria-hidden="true" />
              <strong className="text-primary m-3">Loading...</strong>
            </div>
          </LoadingContainer>
        </ModalContent>
      </ModalWrapper>
    </ModalOverlay>
  );
}

export default LoadingAnimation;

const LoadingContainer = styled.div`
  height: 15vh;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 100;
`;

const ModalWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 30px 45px 50px;
  border-radius: 8px;
  width: 400px;
  position: relative;
  text-align: center;
`;

// const Button = styled.button`
//   max-width: 100%;
//   padding: 11px 13px;
//   color: rgb(253, 249, 243);
//   font-weight: 600;
//   text-transform: uppercase;
//   background: #0d6efe;
//   border: none;
//   border-radius: 3px;
//   outline: 0;
//   cursor: pointer;
//   margin-top: 0.6rem;
//   box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.1);
//   transition: all 0.3s ease-out;

//   :hover {
//     background: #3b71ca;
//   }
// `;

const Title = styled.h2`
  margin-bottom: 40px;
`;
