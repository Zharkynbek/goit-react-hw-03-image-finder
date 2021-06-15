import React, { Component } from "react";
import "./App.css";
import SearchBar from "./Searchbar/Searchbar";
import ImageGallery from "./ImageGallery/ImageGallery";
import Modal from "./Modal/Modal";
import Loader from "./Loader/Loader";
import Button from "./Button/Button";
// helpers
import scrollGallery from "./helpers/scroll"
import apiService from "./helpers/ApiService";

class App extends Component {
  state = {
    query: "",
    page: 1,
    pictures: [],
    isModalOpen: false,
    modalImg: "",
    isLoad: false
  };

  handleSetQuery = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleGetPictures = async (e) => {
    e.preventDefault();
    this.setState(() => ({
      isLoad: true
    }))
    const { query} = this.state;
    const resp = await apiService(query, 1);
    this.setState({
      pictures: resp.data.hits,
      page: 2,
      isLoad: false,
    });
  };

  handleLoadMorePictures = async () => {
    const { page, query } = this.state;
    const {
      data: { hits },
    } = await apiService(query, page + 1);
    this.setState((prev) => ({
      pictures: [...prev.pictures, ...hits],
      page: prev.page + 1,
    }));
    scrollGallery("ImageGallery");
  }

  handleOpenModal = ({
    target: {
      dataset: { source },
    },
  }) => {
    this.setState({
      isModalOpen: true,
      modalImg: source,
    });
  };

  handleCloseModal = ({target: {nodeName}}) => {
    if (nodeName !== "IMG") {
      this.setState({
        isModalOpen: false
      })
    }
  }

  render() {
    const {
      state: { pictures, query, isModalOpen, modalImg, isLoad },
      handleSetQuery,
      handleGetPictures,
      handleOpenModal,
      handleCloseModal,
      handleLoadMorePictures,
    } = this;
    return (
      <div>
        <SearchBar
          onSetQuery={handleSetQuery}
          onGetPictures={handleGetPictures}
          query={this.state.query}
        />
        <ImageGallery onOpenModal={handleOpenModal} pictures={pictures} />
        {pictures.length > 0 && (
          <Button onLoadPictures={handleLoadMorePictures} />
        )}
        {isLoad && <Loader />}
        {isModalOpen && (
          <Modal onCloseModal={handleCloseModal} modalImg={modalImg} />
        )}
      </div>
    );
  }
}

export default App;
