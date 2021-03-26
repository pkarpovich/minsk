import { useCallback } from "react";
import useLocation from "wouter/use-location";

const isProd = process.env.NODE_ENV === "production";
const BASEPATH = "/minsk";

const makeUseBasepathLocation = (basepath) => () => {
  const [location, setLocation] = useLocation();

  // could be done with regexp, but requires proper escaping
  const normalized = location.startsWith(basepath)
    ? location.slice(basepath.length)
    : location;

  const setter = useCallback((to) => setLocation(basepath + to), [setLocation]);

  return [normalized, setter];
};

export const useBasepathLocation = makeUseBasepathLocation(
  isProd ? BASEPATH : ""
);
