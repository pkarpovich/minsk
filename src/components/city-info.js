import React from "react";
import PropTypes from "prop-types";
import { styled } from "@linaria/react";

import BlackPlaceholder from "./black-placeholder";
import img11 from "../static/images/1003-1181x1772.jpeg";

const CityInfo = ({ onClose }) => {
  return (
    <BlackPlaceholder onClose={onClose}>
      <s.Container>
        <s.Text>
          Contrary to popular belief, Lorem Ipsum is not simply random text. It
          has roots in a piece of classical Latin literature from 45 BC, making
          it over 2000 years old. Richard McClintock, a Latin professor at
          Hampden-Sydney College in Virginia, looked up one of the more obscure
          Latin words, consectetur, from a Lorem Ipsum passage, and going
          through the cites of the word in classical literature, discovered the
          undoubtable source. Lorem Ipsum comes from sections 1.10.32 and
          1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and
          Evil) by Cicero, written in 45 BC. This book is a treatise on the
          theory of ethics, very popular during the Renaissance. The first line
          of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in
          section 1.10.32.
        </s.Text>
        <s.Image src={img11.src} />
        <s.Text>
          Contrary to popular belief, Lorem Ipsum is not simply random text. It
          has roots in a piece of classical Latin literature from 45 BC, making
          it over 2000 years old. Richard McClintock, a Latin professor at
          Hampden-Sydney College in Virginia, looked up one of the more obscure
          Latin words, consectetur, from a Lorem Ipsum passage, and going
          through the cites of the word in classical literature, discovered the
          undoubtable source. Lorem Ipsum comes from sections 1.10.32 and
          1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and
          Evil) by Cicero, written in 45 BC. This book is a treatise on the
          theory of ethics, very popular during the Renaissance. The first line
          of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in
          section 1.10.32.
        </s.Text>
      </s.Container>
    </BlackPlaceholder>
  );
};

const s = {
  Container: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100%;
  `,
  Text: styled.div`
    color: #fff;
    font-size: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 2em;
  `,
  Image: styled.img`
    max-height: 70%;
    max-width: 70%;
    margin-top: 2em;
    margin-bottom: 2em;
  `,
};

CityInfo.propTypes = {
  onClose: PropTypes.func,
};

export default React.memo(CityInfo);
