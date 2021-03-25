/* eslint-disable no-use-before-define */

import { memo, useCallback, useMemo, useState } from "react";
import { styled } from "@linaria/react";
import { useRoute, Link } from "wouter";

import { useImagePreview } from "hooks/useImagePreview";
import { GalleryTypes } from "constants/gallery-types";
import { Routes } from "constants/routes";
import { todayGalleryMock, yesterdayGalleryMock } from "./mocks";
import BackIcon from "icons/back-icon.svg";

const galleries = {
  [GalleryTypes.TODAY]: todayGalleryMock,
  [GalleryTypes.YESTERDAY]: yesterdayGalleryMock,
};

const Gallery = () => {
  const [, { id }] = useRoute(Routes.GALLERY);
  const gallery = useMemo(() => galleries[id] ?? [], [id]);

  const [image, setImage] = useState(null);
  const handleClosePreview = useCallback(() => {
    setImage(null);
  }, []);

  const { renderPreview } = useImagePreview(image, handleClosePreview);

  const handleImageClick = useCallback((img) => () => setImage(img), []);

  return (
    <s.PageContainer>
      <s.BackIconContainer>
        <Link href={Routes.HOME}>
          <BackIcon />
        </Link>
      </s.BackIconContainer>
      {renderPreview()}
      <s.GalleryContainer>
        {gallery.map((i) => (
          <s.GalleryItemContainer key={i.id}>
            <s.GalleryItem
              alt={i.name}
              src={i.url}
              loading="eager"
              onClick={handleImageClick(i)}
            />
            <s.GalleryItemText>{i.name}</s.GalleryItemText>
          </s.GalleryItemContainer>
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
    height: 80%;
  `,
  GalleryItemText: styled.span`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    transition: all ease-in 300ms;

    color: #fff;
    font-size: 2rem;
    opacity: 0;
  `,
  GalleryItemContainer: styled.div`
    position: relative;

    &:hover ${s.GalleryItemText} {
      opacity: 1;
    }
  `,
  GalleryItem: styled.img`
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
