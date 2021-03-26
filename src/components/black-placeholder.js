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
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.9);
    z-index: 1;
    overflow-y: auto;
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
