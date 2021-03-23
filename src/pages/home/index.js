import { memo } from "react";
import { styled } from "@linaria/react";

const Home = () => {
  return <s.Container>Home</s.Container>;
};

const s = {
  Container: styled.div`
    height: 100%;
    width: 100%;
  `,
};

export default memo(Home);
