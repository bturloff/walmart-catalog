import React from "react";
import "./App.css";
import Navbar from "./Navbar";
import Axios from "axios";
import SearchInput from "./SearchInput";
import Alert from "./Alert";
import ProductCard from "./ProductCard";

const url = "http://localhost:3001/products";

class App extends React.Component {
  state = { searchField: "", products: [], didSearch: false };

  componentDidUpdate() {
    /** initialize image zoom logic on all elements with 'materialboxed' class */
    var elems = document.querySelectorAll(".materialboxed");
    window.M.Materialbox.init(elems, {});
  }

  /**
   * Listening for "Enter" Key Stroke. Submit when pressed
   */
  _handleKeyDown = e => {
    if (e.key === "Enter") {
      this._handleSubmit();
    }
  };

  /**
   * Handle search submission. Calls Search API for relavent product data
   */
  _handleSubmit = () => {
    const searchField = this.state.searchField;

    /** Search field cannot be empty */
    if (searchField.length === 0) {
      this.setState({ didSearch: true, products: [] });
      return;
    }

    /** Search field is valid */
    Axios.get(`${url}/${searchField}`)
      .then(res => {
        console.log("res", res);
        this.setState({ products: res.data });
      })
      .catch(err => {
        this.setState({ error: err });
      })
      .finally(() => {
        this.setState({ didSearch: true });
      });
  };

  /**
   * Handle updating the searchField state on every keystroke
   */
  _handleUpdate = e => {
    this.setState({ searchField: e.target.value });
  };

  render() {
    const { products, didSearch } = this.state;

    return (
      <div className="outter-wrapper">
        <Navbar />

        <div className="container">
          {/* Search Input */}
          <SearchInput
            handleKeyDown={this._handleKeyDown}
            handleUpdate={this._handleUpdate}
            value={this.state.searchField}
            handleSubmit={this._handleSubmit}
          />

          {/* Main Content */}
          <div className="main row">
            {!didSearch ? (
              <div>Please enter a keyword to search</div>
            ) : products.length === 0 ? (
              <Alert />
            ) : (
              products.map(p => {
                return <ProductCard product={p} key={p.itemId} />;
              })
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
