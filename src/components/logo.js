import React from "react";
import PropTypes from "prop-types";
import { styled } from "@linaria/react";

import logo from "static/logo.png";

const Logo = ({ needDelay = true, onClick }) => {
  return (
    <s.Logo needDelay={needDelay} src={logo} alt="logo" onClick={onClick} />
  );
};

const s = {
  Logo: styled.img`
    z-index: 2;
    width: 180px;

    animation: showLogo ${(props) => (props.needDelay ? "5s" : "0s")} forwards;
    opacity: 0;
    cursor: pointer;

    @keyframes showLogo {
      25% {
        opacity: 0;
      }
      50% {
        opacity: 0;
      }
      75% {
        opacity: 0.75;
      }
      100% {
        opacity: 1;
      }
    }
  `,
};

Logo.propTypes = {
  needDelay: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};

export default React.memo(Logo);
