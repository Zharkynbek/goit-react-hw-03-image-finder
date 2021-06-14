import React from "react";

const ImageGalleryItem = ({onOpenModal, pictures }) => (
  <>
    {pictures.map(({id, webformatURL, largeImageURL, tags}) => (
      <li key={id} className="ImageGalleryItem">
        <img onClick={onOpenModal} src={webformatURL}
          alt={tags}
          data-source={largeImageURL}
          className="ImageGalleryItem-image"
/>
      </li>
    ))}
  </>
);

export default ImageGalleryItem;
