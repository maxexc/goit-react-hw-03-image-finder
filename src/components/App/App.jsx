import { ImageGallery } from "components/ImageGallery/ImageGallery";
import { Searchbar } from "components/Searchbar/Searchbar";
import React, {Component} from "react";

class App extends Component {
  state = {}

  render() {
    console.log()

    return (
      
      <>
        <Searchbar></Searchbar>
        <ImageGallery />
        React homework Image-Finder
      </>
    )
  }
}

export default App;



