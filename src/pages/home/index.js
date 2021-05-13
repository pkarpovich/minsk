import { memo, useCallback } from "react";
import { styled } from "@linaria/react";
import { useLocation } from "wouter";

import video from "static/bg-video.mp4";
import { Routes } from "constants/routes";
import Logo from "components/logo";

const Home = () => {
  const [, setLocation] = useLocation();
  const handleImageClick = useCallback(() => {
    setLocation(Routes.NAVIGATION);
  }, [setLocation]);

  return (
    <s.Container>
      <s.Video autoPlay muted loop>
        <source src={video} type="video/mp4" />
      </s.Video>
      <Logo onClick={handleImageClick} />
    </s.Container>
  );
};

const s = {
  Container: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  `,
  Video: styled.video`
    position: fixed;
    right: 0;
    bottom: 0;
    min-width: 100%;
    min-height: 100%;
    z-index: 1;
  `,
};

export default memo(Home);
