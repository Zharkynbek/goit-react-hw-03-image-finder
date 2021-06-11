import React from "react"

const SearchBar = ({onSetQuery, onGetPictures}) => (
    <header className="Searchbar">
  <form className="SearchForm" onSubmit={onGetPictures}>
    <button type="submit" className="SearchForm-button">
      <span className="SearchForm-button-label">Search</span>
    </button>

      <input
        onInput={onSetQuery}
      className="SearchForm-input"
      type="text"
      autoComplete="off"
      autoFocus
        placeholder="Search images and photos"
        name="query"
    />
  </form>
</header>
)

export default SearchBar