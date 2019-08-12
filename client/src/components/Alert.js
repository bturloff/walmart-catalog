import React from "react";

/**
 * Renders an alert, letting the user know the search query was invalid
 */

const Alert = () => {
  return (
    <div className="col s12 alert">
      <div className="card yellow lighten-3">
        <div className="card-title">
          <i className="medium material-icons">priority_high</i>
          <span>Sorry No Products match your search</span>
        </div>
        <div className="card-content">
          <ul>
            <li>Check your spelling</li>
            <li>Use different keywords and try again</li>
            <li>Contact your local store</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Alert;
