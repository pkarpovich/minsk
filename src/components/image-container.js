import { memo } from "react";
import PropTypes from "prop-types";
import { useImage } from "react-image";

const ImageContainer = ({ image, children }) => {
  const { src } = useImage({ srcList: image });

  return children(src);
};

ImageContainer.propTypes = {
  image: PropTypes.string,
};

export default memo(ImageContainer);
