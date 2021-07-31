import React, { useState, useEffect } from "react";
import "./App.css";
import SearchBar from "./Searchbar/Searchbar";
import ImageGallery from "./ImageGallery/ImageGallery";
import Modal from "./Modal/Modal";
import Loader from "./Loader/Loader";
import Button from "./Button/Button";
// helpers
import scrollGallery from "./helpers/scroll";
import apiService from "./helpers/ApiService";

export default function App() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [pictures, setPictures] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImg, setModalImg] = useState("");
  const [isLoad, setIsLoad] = useState(false);

  useEffect(() => {
    window.addEventListener("keydown", handleCloseWithEscape);
    return () => window.removeEventListener("keydown", handleCloseWithEscape);
  }, []);

  const handleCloseWithEscape = (e) => {
    if (e.code === "Escape") {
      setIsModalOpen(false);
    }
  };

  const handleSetQuery = (e) => {
    setQuery(e.target.value);
  };

  const handleGetPictures = async (e) => {
    e.preventDefault();
    setIsLoad(true);
    const {
      data: { hits },
    } = await apiService(query, 1);
    try {
      setPictures(hits);
      setPage(2);
    } catch (error) {
      alert(error.message);
    } finally {
      setIsLoad(false);
    }
  };

  const handleLoadMorePictures = async () => {
    const {
      data: { hits },
    } = await apiService(query, page + 1);
    setPictures((prevState) => [...prevState, ...hits]);
    setPage((prevState) => prevState + 1);
    scrollGallery("ImageGallery");
  };

  const handleOpenModal = ({
    target: {
      dataset: { source },
    },
  }) => {
    setIsModalOpen(true);
    setModalImg(source);
  };

  const handleCloseModal = ({ target: { nodeName } }) => {
    if (nodeName !== "IMG") {
      setIsModalOpen(false);
    }
  };

  return (
    <div>
      <SearchBar
        onSetQuery={handleSetQuery}
        onGetPictures={handleGetPictures}
        query={query}
      />
      <ImageGallery onOpenModal={handleOpenModal} pictures={pictures} />
      {pictures.length > 0 && (
        <Button onLoadPictures={handleLoadMorePictures} />
      )}
      {isLoad && <Loader />}
      {isModalOpen && (
        <Modal
          onCloseEscape={handleCloseWithEscape}
          onCloseModal={handleCloseModal}
          modalImg={modalImg}
        />
      )}
    </div>
  );
}
