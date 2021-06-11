import React from "react"
import ImageGalleryItem from "./ImageGalleryItem/ImageGalleryItem"


const ImageGallery = ({pictures}) => (
    <ul className="ImageGallery">
        <ImageGalleryItem pictures={ pictures}/>
</ul>
)

export default ImageGallery