import React, { useCallback, useEffect, useState } from "react";
import { useLocation, useRoute } from "wouter";
import ImageUploader from "react-images-upload";
import { nanoid } from "nanoid";
import { styled } from "@linaria/react";

import { Routes } from "constants/routes";
import { config } from "config/config";
import PostPreview from "../../components/post-preview";

export const Types = {
  IMAGE: "IMAGE",
  TEXT: "TEXT",
};

export const Categories = {
  TODAY: "Сегодня",
  YESTERDAY: "Вчера",
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
      setLocation(Routes.NAVIGATION);
    }
  });

  const [title, setTitle] = useState("");
  const [type, setType] = useState("Сегодня");
  const [left, setLeft] = useState(0);
  const [top, setTop] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [latitude, setLatitude] = useState(0);
  const [content, setContent] = useState([]);
  const [posts, setPosts] = useState([]);
  const [link, setLink] = useState(null);

  useEffect(() => {
    fetch("/api/gallery")
      .then((resp) => resp.json())
      .then((data) => setPosts(data));
  }, []);

  const handleAddContentButtonClick = useCallback(
    (type) => () => {
      setContent((content) => [...content, defaultContentItem(type)]);
    },
    []
  );

  const handleTitleChange = useCallback((e) => {
    setTitle(e.target.value);
  }, []);

  const handleTopChange = useCallback((e) => {
    setTop(e.target.value);
  }, []);

  const handleLeftChange = useCallback((e) => {
    setLeft(e.target.value);
  }, []);

  const handleLongitudeChange = useCallback((e) => {
    setLongitude(e.target.value);
  }, []);

  const handleLatitudeChange = useCallback((e) => {
    setLatitude(e.target.value);
  }, []);

  const handleImageUpload = useCallback(
    (id, type) => ([value]) => {
      const reader = new FileReader();
      reader.readAsDataURL(value);
      reader.onload = function (e) {
        setContent((content) =>
          content.map((c) =>
            c.id === id
              ? {
                  ...c,
                  value: [
                    ...(c.value?.filter?.((c) => c.type !== type) ?? []),
                    {
                      id: nanoid(),
                      value: e.target.result,
                      type,
                    },
                  ],
                }
              : c
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

  const handleRemovePostsButtonClick = useCallback(() => {
    setLocation(`/admin/${config.ADMIN_PASS}/remove`);
  }, [setLocation]);

  const handleLinkChange = useCallback((e) => {
    setLink(e.target.value);
  }, []);
  console.log(link);

  const handleClick = useCallback(async () => {
    await fetch(`/api/gallery`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        left,
        top,
        type,
        link,
        content,
        longitude,
        latitude,
      }),
    });
  }, [content, latitude, left, link, longitude, title, top, type]);

  return (
    <>
      <s.ButtonsContainer>
        <s.Button onClick={handleRemovePostsButtonClick}>
          Удаление постов
        </s.Button>
      </s.ButtonsContainer>
      <s.PageContainer>
        <s.LabelsContainer>Настройка поста</s.LabelsContainer>
        <s.LabelsContainer>Предпросмотр</s.LabelsContainer>
      </s.PageContainer>
      <s.PageContainer>
        <s.ContentContainer>
          <s.Box>
            <s.Label>Имя поста: </s.Label>
            <s.Input type="text" value={title} onChange={handleTitleChange} />
          </s.Box>
          <s.Box>
            <s.Label>Top: </s.Label>
            <s.Input type="text" value={top} onChange={handleTopChange} />
          </s.Box>
          <s.Box>
            <s.Label>Left: </s.Label>
            <s.Input type="text" value={left} onChange={handleLeftChange} />
          </s.Box>
          <s.Box>
            <s.Label>Longitude: </s.Label>
            <s.Input
              type="text"
              value={longitude}
              onChange={handleLongitudeChange}
            />
          </s.Box>
          <s.Box>
            <s.Label>Latitude: </s.Label>
            <s.Input
              type="text"
              value={latitude}
              onChange={handleLatitudeChange}
            />
          </s.Box>
          <s.Box>
            <s.Label>Категория поста: </s.Label>
            <s.Select value={type} onChange={handleTypeChange}>
              <option>{Categories.TODAY}</option>
              <option>{Categories.YESTERDAY}</option>
            </s.Select>
          </s.Box>
          <s.Box>
            <s.Label>Связать с другим:</s.Label>
            <s.Select value={link} onChange={handleLinkChange}>
              {posts.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.title} ({p.type})
                </option>
              ))}
            </s.Select>
          </s.Box>
          <s.Box>
            <s.Label>Контент: </s.Label>
            <div style={{ display: "flex" }}>
              <s.Box>
                <s.Button onClick={handleAddContentButtonClick(Types.IMAGE)}>
                  Добавить картинку
                </s.Button>
              </s.Box>
              <s.Box>
                <s.Button onClick={handleAddContentButtonClick(Types.TEXT)}>
                  Добавить текст
                </s.Button>
              </s.Box>
            </div>
          </s.Box>
          <div>
            {content.map((c) => {
              switch (c.type) {
                case Types.TEXT: {
                  return (
                    <s.Textarea
                      key={c.id}
                      value={c.value}
                      rows={10}
                      onChange={handleTextChange(c.id)}
                    />
                  );
                }
                case Types.IMAGE: {
                  return (
                    <s.Flex>
                      <s.ImageUploader
                        key={c.id}
                        withIcon={false}
                        withPreview={false}
                        buttonText="Картинка сегодня"
                        onChange={handleImageUpload(c.id, Categories.TODAY)}
                        imgExtension={[".jpg", ".gif", ".png", ".gif"]}
                        maxFileSize={5242880}
                      />
                      <s.ImageUploader
                        key={c.id}
                        withIcon={false}
                        withPreview={false}
                        buttonText="Картинка вчера"
                        onChange={handleImageUpload(c.id, Categories.YESTERDAY)}
                        imgExtension={[".jpg", ".gif", ".png", ".gif"]}
                        maxFileSize={5242880}
                      />
                    </s.Flex>
                  );
                }
                default: {
                  return <div />;
                }
              }
            })}
          </div>
          <s.Box>
            <s.Button onClick={handleClick}>Добавить пост</s.Button>
          </s.Box>
        </s.ContentContainer>
        <s.ContentContainer>
          <PostPreview needBackground={true} title={title} content={content} />
        </s.ContentContainer>
      </s.PageContainer>
    </>
  );
};

export const s = {
  PageContainer: styled.div`
    display: flex;
  `,
  ContentContainer: styled.div`
    width: 50%;
    overflow-y: auto;
    padding: 30px;
    margin: 30px;
    border: 1px solid #000;
  `,
  ButtonsContainer: styled.div`
    margin-top: 30px;
    margin-left: 30px;
  `,
  LabelsContainer: styled.div`
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 21px;
  `,
  Preview: styled.div`
    background-color: rgba(0, 0, 0, 0.9);
  `,
  Input: styled.input`
    display: block;
    box-sizing: border-box;
    width: 100%;
    height: 30px;
    border: 1px solid #ddd;
    background: #eee;
    outline: none;
    font: inherit;
  `,
  Select: styled.select`
    display: block;
    box-sizing: border-box;
    width: 100%;
    height: 30px;
    border: 1px solid #ddd;
    background: #eee;
    outline: none;
    font: inherit;
  `,
  Label: styled.label`
    font-size: 21px;
  `,
  Button: styled.button`
    background-color: ${(props) => props.color ?? "green"};
    border: 1px solid ${(props) => props.color ?? "green"};
    color: #fff;
    width: 200px;
    height: 40px;
    padding: 6px 20px;
    font-size: 16px;
    border-radius: 40px;
    outline: none;
    font-weight: 400;
    white-space: nowrap;
    text-align: center;
    user-select: none;
    font-family: sans-serif;
    margin-bottom: 1em;
    cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};

    &:hover {
      outline: none;
    }

    a {
      color: #fff;
      text-decoration: none;
    }
  `,
  Textarea: styled.textarea`
    width: 100%;
    border: 1px solid #ddd;
    background: #eee;
    margin-top: 10px;
    margin-bottom: 10px;
  `,
  ImageUploader: styled(ImageUploader)`
    width: 50%;
    margin: 5px;
  `,
  Box: styled.div`
    margin: 10px;
  `,
  Flex: styled.div`
    display: flex;
    margin: 5px;
  `,
};

export default React.memo(Admin);
