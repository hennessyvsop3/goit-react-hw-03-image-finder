import React, { Component } from 'react';
import { SearchBarStyled } from './SearchBar.styled';

export class SearchBar extends Component {
  state = {
    searchText: '',
  };

    
  handleChange = e => {
    this.setState({ searchText: e.target.value });
  };
    handleKeyDown = e => {
        if (e.key === "Enter") {
            this.props.onSubmitSearch(this.state.searchText)
            this.setState({searchText:''})
        }
        
  }
  componentDidMount() {}

  render() {
    return (
      <SearchBarStyled>
        <input
          onKeyDown={this.handleKeyDown}
          onChange={this.handleChange}
          type="text"
          value={this.state.searchText}
        />
      </SearchBarStyled>
    );
  }
}
