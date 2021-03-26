/* eslint-disable no-use-before-define */

import { memo, useCallback } from "react";
import { styled } from "@linaria/react";
import { useLocation } from "wouter";

import { GalleryTypes } from "constants/gallery-types";

import bgLeft from "static/wp2307392.jpeg";
import bgRight from "static/minsk106_v-fullhd.jpeg";
import ImageLoading from "../../components/image-loading";

const Home = () => {
  const [, setLocation] = useLocation();

  const handleImageClick = useCallback(
    (newUrl) => (e) => {
      e.stopPropagation();
      setLocation(newUrl);
    },
    [setLocation]
  );

  return (
    <s.Container>
      <s.LinkContainer>
        <s.Label href={""}>Минск</s.Label>
      </s.LinkContainer>
      <ImageLoading image={bgLeft}>
        {(src) => (
          <s.Img
            bg={`url(${src})`}
            width={65}
            isLeft={true}
            onClick={handleImageClick(`/gallery/${GalleryTypes.YESTERDAY}`)}
          >
            <s.Label>Вчера</s.Label>
          </s.Img>
        )}
      </ImageLoading>
      <ImageLoading image={bgRight}>
        {(src) => (
          <s.Img
            bg={`url(${src})`}
            width={65}
            left={35}
            isLeft={false}
            onClick={handleImageClick(`/gallery/${GalleryTypes.TODAY}`)}
          >
            <s.Label>Вчера</s.Label>
          </s.Img>
        )}
      </ImageLoading>
    </s.Container>
  );
};

const s = {
  Container: styled.div`
    height: 100%;
    width: 100%;

    display: flex;
    justify-content: space-between;
    overflow: hidden;
  `,
  Label: styled.span`
    font-size: 3rem;
    color: #fff;
    text-shadow: 2px 2px 4px #000000;
    cursor: pointer;

    transition: text-decoration ease-in 700ms;

    &:hover {
      text-decoration: underline;
    }
  `,
  Img: styled.div`
    width: ${(props) => props.width ?? "50"}%;
    height: 100%;
    position: fixed;
    top: 0;
    left: ${(props) => props.left ?? 0}%;
    background: ${(props) => props.bg} no-repeat center center fixed;
    background-size: cover;
    clip-path: ${(props) =>
      props.isLeft
        ? "polygon(0 0, 60% 0, 100% 100%, 0 100%)"
        : "polygon(0 0, 100% 0, 100% 100%, 40% 100%)"};
    transform: scale(1) translateZ(0);
    transition: all ease-in 300ms;
    cursor: pointer;

    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
      transform: scale(1.3) translateZ(0);
    }

    &:hover ${s.Label} {
      text-decoration: underline;
    }
  `,
  LinkContainer: styled.div`
    position: fixed;
    top: 15px;
    right: 15px;
    z-index: 1;
  `,
};

export default memo(Home);
