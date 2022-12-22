// import PropTypes from 'prop-types';

// export const ImageGalleryItem = () => (
//     <li className="gallery-item">
//         <img src="" alt="" />
//     </li>
// )

export const ImageGalleryItem = ({ images }) => {
  return images.map((image) => (
      <li key={image.id}>
        <a href={image.largeImageURL}>
          <img
          src={image.webformatURL}
          alt={image.tags}
          // onClick={() => onSelect(image.largeImageURL, image.tags)}
          loading="lazy"
          />
        </a>
      </li>  
  ));
};

  // ImageGalleryItem.propTypes = {
  //   largeImageURL: PropTypes.string,
  //   webformatURL: PropTypes.string,
  //   tags: PropTypes.string,
  // };