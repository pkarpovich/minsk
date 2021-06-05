import { memo, useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { YMaps, Map, Placemark } from "react-yandex-maps";

import BlackPlaceholder from "./black-placeholder";
import PostPreview, { s } from "./post-preview";
import { Categories } from "../pages/admin";

const ImagePreview = ({
  link,
  type,
  gallery,
  content = [],
  title,
  longitude,
  latitude,
  onClose,
}) => {
  const [state, setState] = useState({
    link: "",
    type: "",
    content: [],
    title: "",
  });

  useEffect(() => {
    setState({
      link,
      type,
      content,
      title,
    });
  }, [content, link, title, type]);

  const handleImageClick = useCallback((e) => {
    e.stopPropagation();
  }, []);

  const handleClick = useCallback(
    (e) => {
      e.stopPropagation();
      const item = gallery.find((g) => g.id === state.link);

      setState(item);
    },
    [gallery, state.link]
  );

  return (
    <BlackPlaceholder onClose={onClose}>
      <PostPreview
        title={state.title}
        content={state.content}
        onClick={handleImageClick}
      />
      <s.MapContainer>
        <YMaps>
          <Map
            width={800}
            height={600}
            defaultState={{ center: [53.9006, 27.559], zoom: 13 }}
          >
            <Placemark geometry={[longitude, latitude]} />
          </Map>
        </YMaps>
      </s.MapContainer>
      <div
        style={{ display: "flex", justifyContent: "center", cursor: "pointer" }}
      >
        <s.Article onClick={handleClick}>
          {state.title}{" "}
          {state.type === Categories.TODAY
            ? Categories.YESTERDAY.toLowerCase()
            : Categories.TODAY.toLowerCase()}
        </s.Article>
      </div>
    </BlackPlaceholder>
  );
};

ImagePreview.propTypes = {
  link: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  gallery: PropTypes.array.isRequired,
  image: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ImagePreview;
