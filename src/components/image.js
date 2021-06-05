/* eslint-disable no-use-before-define */

import { memo } from "react";
import PropTypes from "prop-types";
import { styled } from "@linaria/react";

const Image = ({ src, alt, style, onClick }) => {
  return <s.Img src={src} alt={alt} style={style} onClick={onClick} />;
};

const s = {
  Img: styled.img`
    cursor: pointer;
    width: auto;
  `,
};

Image.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  style: PropTypes.object,
  onClick: PropTypes.func,
};

export default memo(Image);
