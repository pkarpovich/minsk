import { memo, useCallback } from "react";
import { styled } from "@linaria/react";
import PropTypes from "prop-types";

import BlackPlaceholder from "./black-placeholder";

const ImagePreview = ({ image, text = <></>, onClose }) => {
  const handleImageClick = useCallback((e) => {
    e.stopPropagation();
  }, []);

  return (
    <BlackPlaceholder onClose={onClose}>
      <s.Container>
        <s.Image src={image} alt="preview" onClick={handleImageClick} />
        {text}
      </s.Container>
    </BlackPlaceholder>
  );
};

export const s = {
  Container: styled.div`
    //height: 100%;
    //max-height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 3em;
    overflow-y: auto;
  `,
  Image: styled.img`
    max-height: 70%;
    max-width: 70%;
    margin-top: 2em;
    margin-bottom: 2em;
  `,
  Article: styled.div`
    font-size: 2rem;
    color: #fff;
  `,
};

ImagePreview.propTypes = {
  image: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default memo(ImagePreview);
