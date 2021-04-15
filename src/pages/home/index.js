/* eslint-disable no-use-before-define */

import { memo, useCallback, useState } from "react";
import { createPortal } from "react-dom";
import { styled } from "@linaria/react";
import { useLocation } from "wouter";

import { GalleryTypes } from "constants/gallery-types";

import bgLeft from "static/wp2307392.jpeg";
import bgRight from "static/minsk106_v-fullhd.jpeg";
import ImageLoading from "../../components/image-loading";
import CityInfo from "../../components/city-info";

const Home = () => {
  const [, setLocation] = useLocation();
  const [needShowCityInfo, toggleCityInfo] = useState(false);

  const handleImageClick = useCallback(
    (newUrl) => (e) => {
      e.stopPropagation();
      setLocation(newUrl);
    },
    [setLocation]
  );

  const handleOpenCityInfo = useCallback(() => toggleCityInfo(true), []);
  const handleCloseCityInfo = useCallback(() => toggleCityInfo(false), []);

  const renderCityInfo = useCallback(() => {
    return (
      needShowCityInfo &&
      createPortal(<CityInfo onClose={handleCloseCityInfo} />, document.body)
    );
  }, [handleCloseCityInfo, needShowCityInfo]);

  return (
    <s.Container>
      {renderCityInfo()}
      <s.LinkContainer>
        <s.Label onClick={handleOpenCityInfo}>Минск</s.Label>
      </s.LinkContainer>
      <div>
        <s.LabelContainer>
          <s.Label>gdfgdfgdfgdfgd</s.Label>
        </s.LabelContainer>
        <ImageLoading
          image={bgLeft}
          onClick={handleImageClick(`/gallery/${GalleryTypes.YESTERDAY}`)}
        >
          {(src) => (
            <s.Img bg={`url(${src})`} width={65} isLeft={true}>
              <s.Label>Вчера</s.Label>
            </s.Img>
          )}
        </ImageLoading>
      </div>
      <div>
        <s.LabelContainer>
          <s.Label>Минск</s.Label>
        </s.LabelContainer>
        <ImageLoading
          image={bgRight}
          onClick={handleImageClick(`/gallery/${GalleryTypes.TODAY}`)}
        >
          {(src) => (
            <s.Img bg={`url(${src})`} width={65} left={35} isLeft={false}>
              <s.Label>Сегодня</s.Label>
            </s.Img>
          )}
        </ImageLoading>
      </div>
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
  LabelContainer: styled.div`
    display: flex;
    height: 30%;
    width: 50vw;
    justify-content: center;
    align-items: center;
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
    height: 70%;
    position: fixed;
    top: 30%;
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
      height: 61%;
      top: 39%;
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
