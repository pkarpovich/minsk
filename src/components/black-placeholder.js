import React, { useCallback } from "react";
import PropTypes from "prop-types";
import { styled } from "@linaria/react";

import CloseIcon from "icons/close-icon.svg";

const BlackPlaceholder = ({ children, onClose }) => {
  const handleCloseIconClick = useCallback(
    (e) => {
      e.stopPropagation();
      onClose();
    },
    [onClose]
  );
  return (
    <s.Container onClick={onClose}>
      <s.CloseIconContainer onClick={handleCloseIconClick}>
        <CloseIcon />
      </s.CloseIconContainer>
      {children}
    </s.Container>
  );
};

const s = {
  Container: styled.div`
    position: fixed;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.9);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1;
  `,
  CloseIconContainer: styled.div`
    position: fixed;
    top: 25px;
    right: 25px;
    width: 45px;
    height: 45px;
    fill: #fff;
    cursor: pointer;
  `,
};

BlackPlaceholder.propTypes = {
  onClose: PropTypes.func,
};

export default React.memo(BlackPlaceholder);
