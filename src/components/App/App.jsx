import { ImageGallery } from "components/ImageGallery/ImageGallery";
import { Searchbar } from "components/Searchbar/Searchbar";
import { Component } from "react";
import { getImagesApi } from '../../services/ApiService'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import Loader from "components/Loader/Loader";
import Button from "components/Button/Button";
import Container from './App.styled';



export class App extends Component {
  state = {
    images: [],
    query: null,
    page: 1,  
    totalPages: null,
    loading: false,
    // selectedImg: null,
    // modalImgAlt: '',
  };

  simpleLightbox = () => {
    var lightbox = new SimpleLightbox('.gallery a', {
      captionsData: 'alt',
      captionDelay: 150,
    });
    lightbox.refresh();
  };

  async componentDidUpdate(_, prevState) {
    const { query, page, totalPages, images } = this.state;
    this.simpleLightbox(); 
    console.log('prevState.page: ', prevState.page);
    console.log('this.state.page: ', this.state.page);

    console.log('prevState.query: ', prevState.query);
    console.log('this.state.query: ', this.state.query);         

    if (prevState.page !== page && page !== 1) {
      this.setState({ loading: true });
      const res = await getImagesApi(query, page);
      console.log(res);

      this.setState(({ images }) => ({
        images: [...images, ...res.hits],
        loading: false,
      }));

      setTimeout(() => this.scroll(), 1);
    }

    if (page >= totalPages && images !== prevState.images && images === [] ) {
      toast.warning(
        "We're sorry, but you've reached the end of search results."
      );
    }
  }

  onSubmit = async evt => {
    evt.preventDefault();
    const input = evt.target.elements.search;
    const value = input.value.trim();
    const page = 1;

    if (value === '') {
      toast.success('Please, enter another search value!');
      this.setState({ images: [] });
      return;
    }

    this.setState({ loading: true });
    const res = await getImagesApi(value, page);
    console.log(res);
    this.setState({ loading: false });

    if (res.hits.length === 0) {
      toast.success(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      this.setState({ images: [] });
      return;
    }

    const totalPages = Math.floor(res.totalHits / 12);

    this.setState({
      images: res.hits,
      query: value,
      page,
      totalPages: totalPages,
    });
  };  

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,      
    }));
  };

  scroll = () => {
    const { clientHeight } = document.documentElement;
    window.scrollBy({
      top: clientHeight - 180,
      behavior: 'smooth',
    });
  }; 

  // selectImg = (imgUrl, altTag) => {
  //   this.setState({ selectedImg: imgUrl, modalImgAlt: altTag });
  // };

  // closeModal = () => {
  //   this.setState({
  //     selectedImg: '',
  //     modalImgAlt: '',
  //   });
  // };

  render() {
    const { images, loading, totalPages, page } = this.state;
    const checkEndList = page < totalPages;
    const checkGalleryImg = images.length !== 0;
    

    return (
      <Container>
        <Searchbar onSubmit={this.onSubmit} />
        {checkGalleryImg && <ImageGallery
              images={images}
              // onSelect={this.selectImg}
        ></ImageGallery> } 
        {loading ? (
          <Loader />
        ) : (
          checkGalleryImg && checkEndList && <Button onClick={this.loadMore} />
        )}
        <ToastContainer autoClose={2000} position="top-center" theme="light" />
      </Container>
    )
  }
}
  



//   state = {
//     searchValue: '',
//     pageNumber: 1,
//     images: [],
//     isLoading: false,
//     selectedImg: null,
//     modalImgAlt: '',
//     hide: true,
//   };

//   handleSubmit = async e => {
//     // console.log(e);
//     this.setState({ isLoading: true, images: [], hide: true, pageNumber: 1 });
//     if (e.trim() === '') {
//       return;
//     }
//     const response = await getImagesApi(e, 1);
//     // console.log(response);
//     if (response.hits.length === 0) {
      
//       return this.setState({ hide: true, isLoading: false });
//     } else {
//       this.setState({
//         images: response.hits,
//         isLoading: false,
//         pageNumber: 1,
//         hide: false,
//       });
//       if (response.hits.length < 12) {
//         return this.setState({ hide: true });
//       }
//     }

//     this.setState({
//       images: response.hits,
//       isLoading: false,
//       searchValue: e,
//       pageNumber: 1,
//       hide: false,
//     });
//   };

//   handleLoadMore = async () => {
//     const { searchValue, pageNumber, images } = this.state;

//     this.setState({ isLoading: true });
//     const response = await getImagesApi(searchValue, pageNumber + 1);

//     this.setState(prevState => ({
//       images: [...prevState.images, ...response.hits],
//       pageNumber: pageNumber + 1,
//       isLoading: false,
//     }));

//     if (images.length === response.totalHits) {
//       this.setState({ hide: true });
//     }

//     if (response.hits.length < 12) {
//       this.setState({ hide: true });
//     }
//   };

//   selectImg = (imgUrl, altTag) => {
//     this.setState({ selectedImg: imgUrl, modalImgAlt: altTag });
//   };

//   closeModal = () => {
//     this.setState({
//       selectedImg: '',
//       modalImgAlt: '',
//     });
//   };

//   render() {
//     const { images, selectedImg, modalImgAlt, isLoading, hide } = this.state;
//     return (
//       <>
//         <Searchbar onFormSubmit={this.handleSubmit}></Searchbar> 
//         {images !== [] ? (
//           <React.Fragment>
            // <ImageGallery
            //   images={images}
            //   onSelect={this.selectImg}
            // ></ImageGallery>            
//           </React.Fragment>
//         ) : null}

       
        
//       </>
//     );
//   }
// }
