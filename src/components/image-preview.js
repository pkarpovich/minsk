import { memo, useCallback } from "react";
import { styled } from "@linaria/react";
import PropTypes from "prop-types";

import BlackPlaceholder from "./black-placeholder";
import { Types } from "../pages/admin";

const ImagePreview = ({ content = [], title, onClose }) => {
  const handleImageClick = useCallback((e) => {
    e.stopPropagation();
  }, []);

  return (
    <BlackPlaceholder onClose={onClose}>
      <s.Container onClick={handleImageClick}>
        <s.Article>{title}</s.Article>
        {content.map((c) => {
          if (!c.value) {
            return <div />;
          }

          switch (c.type) {
            case Types.TEXT: {
              return <s.Article key={`${c.id}_preview`}>{c.value}</s.Article>;
            }
            case Types.IMAGE: {
              console.log(c.value);
              return (
                <s.Image key={`${c.id}_preview`} src={c.value} alt="preview" />
              );
            }
            default: {
              return <div />;
            }
          }
        })}
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
