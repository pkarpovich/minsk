/* eslint-disable no-use-before-define */

import { memo, useCallback, useState } from "react";
import { createPortal } from "react-dom";
import { styled } from "@linaria/react";
import { useLocation } from "wouter";

import bgLeft from "static/wp2307392.jpeg";
import bgRight from "static/minsk106_v-fullhd.jpeg";
import ImageLoading from "components/image-loading";
import CityInfo from "components/city-info";
import Logo from "components/logo";
import { Categories } from "../admin";
import { Routes } from "constants/routes";

const Navigation = () => {
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

  const handleLogoClick = useCallback(() => {
    setLocation(Routes.HOME);
  }, [setLocation]);

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
      <ImageLoading
        image={bgLeft}
        onClick={handleImageClick(`/gallery/${Categories.YESTERDAY}`)}
      >
        {(src) => (
          <s.Img bg={`url(${src})`} width={65} isLeft={true}>
            <s.Label>Вчера</s.Label>
          </s.Img>
        )}
      </ImageLoading>
      <ImageLoading
        image={bgRight}
        onClick={handleImageClick(`/gallery/${Categories.TODAY}`)}
      >
        {(src) => (
          <s.Img bg={`url(${src})`} width={65} left={35} isLeft={false}>
            <s.Label>Сегодня</s.Label>
          </s.Img>
        )}
      </ImageLoading>
      <s.LogoContainer>
        <Logo needDelay={false} onClick={handleLogoClick} />
      </s.LogoContainer>
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
  LogoContainer: styled.div`
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  `,
};

export default memo(Navigation);
