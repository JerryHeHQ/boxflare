import React from 'react';
import './SearchBar.css';
import SendButton from '../../Common/send_button.svg'; 
import AddButton from '../../Common/plus-solid.svg'; 

const SearchBar = ({ labelText, placeholder, defaultValue, showButton, setTextState, onClick }) => {
    return (
      <div className="search-bar-container">
        {labelText && <label htmlFor="search-input" className="search-bar-label">{labelText}</label>}
        <div className="search-bar">
          <input
            id="search-input"
            type="text"
            placeholder={placeholder}
            defaultValue={defaultValue}
            className="search-input"
            onChange={(e) => setTextState(e.target.value)}
          />
          {showButton 
          ? 
          <button className="search-button">
            <img src={AddButton} alt="Send" onClick={() => onClick()}/>
          </button>
          :
          null
          }
        </div>
      </div>
    );
  };

export default SearchBar;
