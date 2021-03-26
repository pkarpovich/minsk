/* eslint-disable no-use-before-define */

import { memo } from "react";
import PropTypes from "prop-types";
import { styled } from "@linaria/react";

const Image = ({ src, alt, text, needShowText = false }) => {
  return (
    <s.GalleryItemContainer>
      <s.Img src={src} alt={alt} />
      <s.GalleryItemText needShowText={needShowText}>{text}</s.GalleryItemText>
    </s.GalleryItemContainer>
  );
};

const s = {
  GalleryItemContainer: styled.div`
    position: relative;

    &:hover ${s.GalleryItemText} {
      opacity: 1;
    }
  `,
  GalleryItemText: styled.span`
    position: absolute;
    top: 50%;
    left: 50%;
    text-align: center;
    transform: translate(-50%, -50%);
    transition: all ease-in 300ms;

    color: #fff;
    font-size: 2rem;
    opacity: ${(props) => (props.needShowText ? 1 : 0)};
  `,
  Img: styled.img`
    margin: 2em;
    transform: scale(1) translateZ(0) skewX(-5deg);
    transition: all ease-in 300ms;
    cursor: pointer;
    width: 600px;

    &:hover {
      transform: scale(1.1) translateZ(0);
      filter: brightness(25%);
    }
  `,
};

Image.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  text: PropTypes.string,
  needShowText: PropTypes.bool,
};

export default memo(Image);
