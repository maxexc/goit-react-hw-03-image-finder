import axios from 'axios';
import Notiflix from 'notiflix';

Notiflix.Notify.init({
  position: 'left-top',
  cssAnimationStyle: 'zoom',
  fontSize: '20px',
  // showOnlyTheLastOne: true,
});

const API_URL = 'https://pixabay.com/api/';
const KEY = '30747162-c0f899af5e8792e55f79454a6';

export async function axiosApi(query, pageNumber) {
  try {
    return await axios
      .get(API_URL, {
        params: {
          key: KEY,
          q: query,
          image_type: 'photo',
          orientation: 'horizontal',
          safesearch: 'true',
          page: pageNumber,
          per_page: 12,
        },
      })
      .then(async response => {
        if (response.status !== 200) {
          return Promise.reject(`Error: ${response.message}`);
        }
        if (!response.data.totalHits) {
          Notiflix.Notify.failure(
            'Sorry, there are no images matching your search query. Please try again.'
          );
        }
        if (pageNumber === 1 && response.data.totalHits) {
          Notiflix.Notify.success(
            `Hooray! We found ${response.data.totalHits} images.`
          );
        }
        return await response.data;
      });
  } catch (error) {
    console.error(error);
  }
}








//   const BASE_SEARH_PARAMS = {
//     key: KEY,
//     image_type: 'photo',
//     orientation: 'horizontal',
//     per_page: 12,
//     page,
//     q: query,
//   };

//   const response = await axios.get(API_URL, {
//     params: BASE_SEARH_PARAMS,
//   });

//   return response.data;
// }