import { memo, useCallback } from "react";
import { styled } from "@linaria/react";
import PropTypes from "prop-types";

import BlackPlaceholder from "./black-placeholder";

const ImagePreview = ({ image, onClose }) => {
  const handleImageClick = useCallback((e) => {
    e.stopPropagation();
  }, []);

  return (
    <BlackPlaceholder onClose={onClose}>
      <s.Preview src={image} alt="preview" onClick={handleImageClick} />
    </BlackPlaceholder>
  );
};

const s = {
  Preview: styled.img`
    max-height: 70%;
  `,
};

ImagePreview.propTypes = {
  image: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default memo(ImagePreview);
