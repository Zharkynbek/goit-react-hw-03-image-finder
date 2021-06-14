function scrollGallery(elementClass) {
    window.scrollTo({
      top: document.querySelector("." + elementClass).scrollHeight,
      behavior: "smooth",
    });
}

export default scrollGallery;