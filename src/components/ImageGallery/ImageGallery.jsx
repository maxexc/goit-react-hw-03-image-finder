import { ImageGalleryItem } from "components/ImageGalleryItem/ImageGalleryItem";

export const ImageGallery = ({ images }) => {
  return (
    <div className="gallery">
      <ul>     
          <ImageGalleryItem images={images} />
      </ul>
    </div>
  );
};

