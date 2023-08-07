const ImageGallery = ({ imageUrls, name }) => {
  // TODO: implement image gallery
  return (
    imageUrls.map((url) => (
      <img
        key={url}
        src={url}
        alt={name}
        style={{ maxHeight: "500px", maxWidth: "500px" }}
      />
    ))
  )
}

export default ImageGallery;
