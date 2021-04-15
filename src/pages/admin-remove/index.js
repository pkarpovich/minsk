import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useLocation, useRoute } from "wouter";
import { Routes } from "../../constants/routes";
import { config } from "../../config/config";
import { GalleryTypes } from "../../constants/gallery-types";

const AdminRemove = () => {
  const [gallery, setGallery] = useState([]);

  useEffect(() => {
    fetch(`/api/gallery`)
      .then((resp) => resp.json())
      .then(setGallery);
  }, []);

  const handleRemove = useCallback(
    (id) => async () => {
      await fetch(`/api/gallery/${id}`, { method: "DELETE" });
      setGallery((g) => g.filter((g) => g.id !== id));
    },
    []
  );

  return (
    <div>
      {gallery.map((g) => (
        <div key={g._id}>
          <span>{g.title}</span>
          <input type="button" value="Remove" onClick={handleRemove(g.id)} />
        </div>
      ))}
    </div>
  );
};

AdminRemove.propTypes = {};

export default React.memo(AdminRemove);
