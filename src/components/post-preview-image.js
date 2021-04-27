import React, { useCallback, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { styled } from "@linaria/react";
import { Categories } from "../pages/admin";

const PostPreviewImage = ({ value }) => {
  const [currentType, setCurrentType] = useState(value[0].type);

  const handleClick = useCallback(() => {
    if (value.length === 1) {
      return;
    }

    setCurrentType((type) =>
      type === Categories.TODAY ? Categories.YESTERDAY : Categories.TODAY
    );
  }, [value.length]);

  const image = useMemo(() => {
    return value.find((v) => v.type === currentType)?.value;
  }, [currentType, value]);

  return <s.Image src={image} alt="preview" onClick={handleClick} />;
};

const s = {
  Image: styled.img`
    max-height: 70%;
    max-width: 70%;
    margin-top: 2em;
    margin-bottom: 2em;
  `,
};

PostPreviewImage.propTypes = {
  value: PropTypes.array,
};

export default React.memo(PostPreviewImage);
