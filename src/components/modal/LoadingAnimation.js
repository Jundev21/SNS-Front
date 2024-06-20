import React from "react";
import styled from "styled-components";

function LoadingAnimation() {
  return (
    <LoadingContainer>
      <div className="d-flex align-items-center justify-content-center h-100">
        <div className="spinner-border text-primary" role="status" aria-hidden="true" />
        <strong className="text-primary m-3">Loading...</strong>
      </div>
    </LoadingContainer>
  );
}

export default LoadingAnimation;

const LoadingContainer = styled.div`
  height: 70vh;
`;
