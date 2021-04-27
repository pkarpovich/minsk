import React from "react";
import PropTypes from "prop-types";
import { Types } from "../pages/admin";
import { styled } from "@linaria/react";
import PostPreviewImage from "./post-preview-image";

const PostPreview = ({ title, content, needBackground = false, onClick }) => {
  return (
    <s.Container needBackground={needBackground} onClick={onClick}>
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
            return <PostPreviewImage key={`${c.id}_preview`} value={c.value} />;
          }
          default: {
            return <div />;
          }
        }
      })}
    </s.Container>
  );
};

export const s = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 3em;
    overflow-y: auto;
    background-color: ${(props) =>
      props.needBackground ? "rgba(0, 0, 0, 0.9)" : null};
  `,
  Article: styled.div`
    font-size: 2rem;
    color: #fff;
  `,
};

PostPreview.propTypes = {
  title: PropTypes.string,
  content: PropTypes.array,
  onClick: PropTypes.func,
};

export default React.memo(PostPreview);
