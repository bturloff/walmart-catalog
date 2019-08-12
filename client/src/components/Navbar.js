import React from "react";

function Navbar(props) {
  return (
    <nav>
      <div className="nav-wrapper static">
        <a href="*" className="brand-logo">
          <img src="walmartlogo.png" alt="" />
        </a>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li>
            <a href="*">
              <i className="large material-icons">account_circle</i>
            </a>
          </li>
          <li>
            <a href="*">
              <i className="large material-icons">location_on</i>
            </a>
          </li>
          <li>
            <a href="*">
              <i className="large material-icons">shopping_cart</i>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
export default Navbar;
