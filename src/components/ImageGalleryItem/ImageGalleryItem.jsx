// import { GalleryItem } from './ImageGalleryItem.styled';
import './ImageGalleryItem.css';
import PropTypes from 'prop-types';

// export const ImageGalleryItem = () => (
//     <li className="gallery-item">
//         <img src="" alt="" />
//     </li>
// )

export const ImageGalleryItem = ({ images }) => {
  return images.map((image) => (
      <li className="photo-card" key={image.id}>
        <a className="img-wrap" href={image.largeImageURL}>
          <img
          className='image'
          src={image.webformatURL}
          alt={image.tags}
          // onClick={() => onSelect(image.largeImageURL, image.tags)}
          loading="lazy"
          />
        </a>
      </li>  
  ));
};

ImageGalleryItem.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ),
};