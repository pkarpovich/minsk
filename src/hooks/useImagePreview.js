import { useCallback } from "react";
import { createPortal } from "react-dom";

import ImagePreview from "components/image-preview";

export const useImagePreview = (image, onClose) => {
  const renderPreview = useCallback(() => {
    return (
      image &&
      createPortal(
        <ImagePreview
          title={image.title}
          content={image.content}
          onClose={onClose}
        />,
        document.body
      )
    );
  }, [image, onClose]);

  return { renderPreview };
};
