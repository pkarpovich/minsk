import React, { useCallback, useEffect, useState } from "react";
import { styled } from "@linaria/react";
import PropTypes from "prop-types";
import { useLocation, useRoute } from "wouter";
import { Routes } from "../../constants/routes";
import { config } from "../../config/config";
import { GalleryTypes } from "../../constants/gallery-types";
import { s } from "../admin";

const AdminRemove = () => {
  const [gallery, setGallery] = useState([]);
  const [, setLocation] = useLocation();

  useEffect(() => {
    fetch(`/api/gallery`)
      .then((resp) => resp.json())
      .then(setGallery);
  }, []);

  const handleBackButtonClick = useCallback(() => {
    setLocation(`/admin/${config.ADMIN_PASS}`);
  }, [setLocation]);

  const handleRemove = useCallback(
    (id) => async () => {
      await fetch(`/api/gallery/${id}`, { method: "DELETE" });
      setGallery((g) => g.filter((g) => g.id !== id));
    },
    []
  );

  return (
    <>
      <s.ButtonsContainer>
        <s.Button onClick={handleBackButtonClick}>Назад</s.Button>
      </s.ButtonsContainer>
      <s.ContentContainer>
        <s.Label>Удаление постов:</s.Label>
        {gallery.map((g) => (
          <s.Box key={g._id}>
            <s.Label>Имя: </s.Label>
            <s.Label>{g.title}</s.Label>
            <s.Label> ({g.type}) </s.Label>
            <s.Button color="#ff2d55" onClick={handleRemove(g.id)}>
              Удалить
            </s.Button>
          </s.Box>
        ))}
      </s.ContentContainer>
    </>
  );
};

AdminRemove.propTypes = {};

export default React.memo(AdminRemove);
