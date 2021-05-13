import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { styled } from "@linaria/react";
import { useRoute, Link } from "wouter";

import { useImagePreview } from "hooks/useImagePreview";
import { GalleryTypes } from "constants/gallery-types";
import { Routes } from "constants/routes";
import BackIcon from "icons/back-icon.svg";
import ImageLoading from "../../components/image-loading";
import Image from "../../components/image";

const Gallery = () => {
  const [, { id }] = useRoute(Routes.GALLERY);
  const [gallery, setGallery] = useState([]);

  useEffect(() => {
    fetch(`/api/gallery?type`)
      .then((resp) => resp.json())
      .then(setGallery);
  }, []);

  const [image, setImage] = useState(null);
  const handleClosePreview = useCallback(() => {
    setImage(null);
  }, []);

  const { renderPreview } = useImagePreview(image, gallery, handleClosePreview);

  const handleImageClick = useCallback((img) => () => setImage(img), []);

  return (
    <s.PageContainer>
      <s.BackIconContainer>
        <Link href={Routes.NAVIGATION}>
          <BackIcon />
        </Link>
      </s.BackIconContainer>
      {renderPreview()}
      <s.GalleryContainer>
        {gallery
          .filter((g) => encodeURI(g.type) === id)
          .map((img) => (
            <Image
              key={img.id}
              src={img.preview}
              text={img.title}
              alt={img.title}
              onClick={handleImageClick(img)}
            />
          ))}
      </s.GalleryContainer>
    </s.PageContainer>
  );
};

const s = {
  BackIconContainer: styled.div`
    position: fixed;
    top: 25px;
    left: 25px;
    width: 45px;
    height: 45px;
    cursor: pointer;
  `,
  PageContainer: styled.div`
    width: 100%;
    height: 100%;

    display: flex;
    align-items: center;
  `,
  GalleryContainer: styled.div`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    overflow-x: auto;
    overflow-y: hidden;

    width: 100%;
    height: 90%;
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

export default memo(Gallery);
