import { useCallback } from "react";
import { createPortal } from "react-dom";

import ImagePreview from "components/image-preview";

export const useImagePreview = (image, gallery, onClose) => {
  const renderPreview = useCallback(() => {
    return (
      image &&
      createPortal(
        <ImagePreview
          link={image.link}
          type={image.type}
          title={image.title}
          content={image.content}
          gallery={gallery}
          onClose={onClose}
        />,
        document.body
      )
    );
  }, [gallery, image, onClose]);

  return { renderPreview };
};
