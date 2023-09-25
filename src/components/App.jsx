import React, { Component } from 'react';
import { SearchBar } from './Searchbar/SearchBar';
import axios from 'axios';
import { Button } from './Button/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';
import css from 'App.module.css';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import Modal from './Modal/Modal';
import ClipLoader from 'react-spinners/ClipLoader';
import { Error } from './Error/Error';

const API_KEY = '39544542-3ccc9045419fe9efc710f49f9';
const BASE_URL = 'https://pixabay.com/api/';

export class App extends Component {
  state = {
    searchText: '',
    loading: false,
    page: 1,
    data: [],
    error:'',
    showModal: false,
    modalImage: '',
    totalHits: 0,
  };

  makeApiCall = async () => {
    this.setState({ loading: true });
    try {
      const { data } = await axios.get(BASE_URL, {
        params: {
          key: API_KEY,
          q: this.state.searchText,
          image_type: 'photo',
          orientation: 'horizontal',
          safesearch: 'true',
          per_page: 12,
          page: this.state.page,
        },
      });
      console.log(data);
      if (data.hits.length === 0) {
        alert('nothing find to your request');
      }
      this.setState(prev => ({
        data: [...prev.data, ...data.hits],
        totalHits: data.totalHits,
      }));
    } catch (error) {
      console.log(error);
    }
    this.setState({ loading: false });
  };

  handleClick = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  componentDidUpdate(_, prevState) {
    if (
      prevState.searchText !== this.state.searchText ||
      prevState.page !== this.state.page
    ) {
      
      this.setState({ loading: true, error: '' })
      this.makeApiCall();
    }
  }

  onSubmitSearch = data => {
    this.setState({ searchText: data, page: 1, data: [] });
    if (this.state.searchText === '') {
  this.setState({error: "Search field is empty"})
}

  };

  onImageClick = url => {
    this.setState({ modalImage: url, showModal: true });
  };

  close = () => {
    this.setState({ showModal: false });
  };

  render() {
    return (
      <main className={css.App}>
        <SearchBar onSubmitSearch={this.onSubmitSearch} />
        {this.state.error.length > 0 && <Error errorText={this.state.error} />}
        <ImageGallery>
          <ImageGalleryItem
            images={this.state.data}
            shouldPopup={this.onImageClick}
          />
        </ImageGallery>
        {this.state.totalHits > this.state.data.length &&
          !this.state.loading && <Button handleClick={this.handleClick} />}
        {this.state.loading && <ClipLoader />}
        {this.state.showModal && (
          <Modal url={this.state.modalImage} close={this.close} />
        )}
      </main>
    );
  }
}
