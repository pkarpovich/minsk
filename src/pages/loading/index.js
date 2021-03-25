import { styled } from "@linaria/react";

const Loading = () => {
  return <Container>Loading...</Container>;
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 3rem;
`;

export default Loading;
