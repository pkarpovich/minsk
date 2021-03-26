import { memo, useCallback } from "react";
import { styled } from "@linaria/react";
import PropTypes from "prop-types";

import CloseIcon from "icons/close-icon.svg";

const ImagePreview = ({ image, onClose }) => {
  const handleImageClick = useCallback((e) => {
    e.stopPropagation();
  }, []);

  return (
    <s.Container onClick={onClose}>
      <s.CloseIconContainer onClick={onClose}>
        <CloseIcon />
      </s.CloseIconContainer>
      <s.Preview src={image} alt="preview" onClick={handleImageClick} />
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
  `,
  Preview: styled.img`
    max-height: 70%;
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

ImagePreview.propTypes = {
  image: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default memo(ImagePreview);
