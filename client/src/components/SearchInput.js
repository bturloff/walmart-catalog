import React, { Component } from "react";
import Axios from "axios";
import PropTypes from "prop-types";

function SearchInput({ handleKeyDown, handleUpdate, value, handleSubmit }) {
  return (
    <div className="input-field">
      <input
        id="search"
        type="text"
        className="validate"
        placeholder="i.e. ozark sleep patio apple"
        value={value}
        onChange={handleUpdate}
        onKeyDown={handleKeyDown}
      />
      <label htmlFor="search">Search</label>
      <i onClick={handleSubmit} className="small material-icons right">
        search
      </i>
    </div>
  );
}
SearchInput.propTypes = {
  handleKeyDown: PropTypes.func,
  handleUpdate: PropTypes.func,
  handleSubmit: PropTypes.func,
  value: PropTypes.string
};

export default SearchInput;
