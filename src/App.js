import React, {Component} from "react"
import './App.css';
import SearchBar from "./Searchbar/Searchbar"
import ImageGallery from "./ImageGallery/ImageGallery"

 // helpers

import apiService from "./helpers/ApiServer"
 
class App extends Component {
  state = {
    query: "",
    page: 1,
    pictures: []
  }

  handleSetQuery = (e) => {
      this.setState({[e.target.name]: e.target.value})
  }
  
  handleGetPictures = async (e) => {
    e.preventDefault()
    const { query, page } = this.state
    const resp = await apiService(query, page)
    this.setState({pictures: resp.data.hits})
  }


  render() {
    return (
      <div>
        <SearchBar
          onSetQuery={this.handleSetQuery}
          onGetPictures={this.handleGetPictures}
        />
        <ImageGallery pictures={this.state.pictures} />
      </div>
    );
  }
}

export default App;
