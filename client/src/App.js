import React from "react";
import "./App.css";
import Navbar from "./Navbar";

class App extends React.Component {
  state = { searchField: "" };

  _handleKeyDown = e => {
    if (e.key === "Enter") {
      console.log("do validate");
    }
  };

  _handleChange = e => {
    this.setState({ searchField: e.target.value });
  };

  render() {
    return (
      <div>
        <Navbar />
        <div className="container">
          <div className="input-field">
            <input
              id="search"
              type="text"
              className="validate"
              value={this.state.searchField}
              onChange={this._handleChange}
              onKeyDown={this._handleKeyDown}
            />
            <label htmlFor="search">Search</label>
          </div>

          <div className="row">
            <div className="col s12 m6">
              <div className="card blue-grey darken-1">
                <div className="card-content white-text">
                  <span className="card-title">Card Title</span>
                  <p>
                    I am a very simple card. I am good at containing small bits
                    of information. I am convenient because I require little
                    markup to use effectively.
                  </p>
                </div>
                <div className="card-action">
                  <a href="#">This is a link</a>
                  <a href="#">This is a link</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
