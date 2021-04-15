import React, { useCallback, useEffect, useState } from "react";
import { useLocation, useRoute } from "wouter";
import ImageUploader from "react-images-upload";
import { nanoid } from "nanoid";
import { styled } from "@linaria/react";

import { Routes } from "constants/routes";
import { config } from "config/config";
import { s as imagePreviewStyles } from "components/image-preview";

export const Types = {
  IMAGE: "IMAGE",
  TEXT: "TEXT",
};

const defaultContentItem = (type) => ({
  id: nanoid(),
  value: "",
  type,
});

const Admin = () => {
  const [, { pass }] = useRoute(Routes.ADMIN);
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (pass !== config.ADMIN_PASS) {
      setLocation(Routes.HOME);
    }
  });

  const [title, setTitle] = useState("");
  const [type, setType] = useState("Сегодня");
  const [content, setContent] = useState([]);

  const handleAddContentButtonClick = useCallback(
    (type) => () => {
      setContent((content) => [...content, defaultContentItem(type)]);
    },
    []
  );

  const handleTitleChange = useCallback((e) => {
    setTitle(e.target.value);
  }, []);

  const handleImageUpload = useCallback(
    (id) => ([value]) => {
      const reader = new FileReader();
      reader.readAsDataURL(value);
      reader.onload = function (e) {
        setContent((content) =>
          content.map((c) =>
            c.id === id ? { ...c, value: e.target.result } : c
          )
        );
      };
    },
    []
  );

  const handleTextChange = useCallback(
    (id) => (e) => {
      setContent((content) =>
        content.map((c) => (c.id === id ? { ...c, value: e.target.value } : c))
      );
    },
    []
  );
  const handleTypeChange = useCallback((e) => {
    setType(e.target.value);
  }, []);

  const handleClick = useCallback(async () => {
    await fetch(`/api/gallery`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        type,
        content,
      }),
    });
  }, [content, title, type]);

  return (
    <s.PageContainer>
      <s.ContentContainer>
        <span>Title: </span>
        <select value={type} onChange={handleTypeChange}>
          <option>Вчера</option>
          <option>Сегодня</option>
        </select>
        <input type="text" value={title} onChange={handleTitleChange} />
        <div>
          <button onClick={handleAddContentButtonClick(Types.IMAGE)}>
            Add image
          </button>
          <button onClick={handleAddContentButtonClick(Types.TEXT)}>
            Add text
          </button>
        </div>
        <div>
          {content.map((c) => {
            switch (c.type) {
              case Types.TEXT: {
                return (
                  <textarea
                    key={c.id}
                    value={c.value}
                    onChange={handleTextChange(c.id)}
                  />
                );
              }
              case Types.IMAGE: {
                return (
                  <ImageUploader
                    key={c.id}
                    withIcon={true}
                    buttonText="Choose images"
                    onChange={handleImageUpload(c.id)}
                    imgExtension={[".jpg", ".gif", ".png", ".gif"]}
                    maxFileSize={5242880}
                  />
                );
              }
              default: {
                return <div />;
              }
            }
          })}
        </div>
        <div>
          <input type="button" onClick={handleClick} value="Add" />
        </div>
      </s.ContentContainer>
      <s.ContentContainer>
        <s.Preview>
          <imagePreviewStyles.Container>
            {content.map((c) => {
              if (!c.value) {
                return <div />;
              }

              switch (c.type) {
                case Types.TEXT: {
                  return (
                    <imagePreviewStyles.Article key={`${c.id}_preview`}>
                      {c.value}
                    </imagePreviewStyles.Article>
                  );
                }
                case Types.IMAGE: {
                  console.log(c.value);
                  return (
                    <imagePreviewStyles.Image
                      key={`${c.id}_preview`}
                      src={c.value}
                      alt="preview"
                    />
                  );
                }
                default: {
                  return <div />;
                }
              }
            })}
          </imagePreviewStyles.Container>
        </s.Preview>
      </s.ContentContainer>
    </s.PageContainer>
  );
};

const s = {
  PageContainer: styled.div`
    display: flex;
  `,
  ContentContainer: styled.div`
    width: 50%;
    overflow-y: auto;
  `,
  Preview: styled.div`
    background-color: rgba(0, 0, 0, 0.9);
  `,
};

export default React.memo(Admin);
