// const ImageGallery = ({ imageUrls, name }) => {
//   // TODO: implement image gallery
//   return (
//     imageUrls.map((url) => (
//       <img
//         key={url}
//         src={url}
//         alt={name}
//         style={{ maxHeight: "500px", maxWidth: "500px" }}
//       />
//     ))
//   )
// }

// export default ImageGallery;
import { useState } from 'react';
import styles from './ImageGallery.module.scss';

const ImageGallery = ({ imagePath }) => {
    const [selectedImage, setSelectedImage] = useState(
        imagePath ? imagePath[0] : ''
    );

    return (
        <div className={styles.imageGallery}>
            <div className={styles.selectedImage}>
                <img src={selectedImage} alt='Selected product' />
            </div>
            <div className={styles.imageThumbnails}>
                {imagePath?.map((image, index) => (
                    <img
                        key={index}
                        src={image}
                        alt={`Thumbnail ${index}`}
                        onClick={() => setSelectedImage(image)}
                        className={image === selectedImage ? 'active' : ''}
                    />
                ))}
            </div>
        </div>
    );
};

export default ImageGallery;
