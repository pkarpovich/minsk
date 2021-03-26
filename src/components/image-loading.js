import { memo, Suspense } from "react";
import PropTypes from "prop-types";

import ImageErrorBoundary from "./image-error-boundary";
import ImageContainer from "./image-container";

const ImageLoading = ({ image, children, onClick = () => {} }) => {
  return (
    <div onClick={onClick}>
      <ImageErrorBoundary
        src={image.preSrc}
        errorFallback={(errorMessage) => children(image.preSrc, errorMessage)}
      >
        <Suspense fallback={children(image.preSrc)}>
          <ImageContainer image={image.src}>
            {(src) => children(src)}
          </ImageContainer>
        </Suspense>
      </ImageErrorBoundary>
    </div>
  );
};

ImageLoading.propTypes = {
  image: PropTypes.object,
  onClick: PropTypes.func,
};

export default memo(ImageLoading);
