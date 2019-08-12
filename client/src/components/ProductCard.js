import React from "react";
import PropTypes from "prop-types";

const ProductCard = ({ product }) => {
  return (
    <div className="col s12 m4" key={product.itemId}>
      <div className="card hoverable">
        <div className="card-image">
          <img
            className="materialboxed"
            src={product.largeImage}
            alt={product.name}
          />
        </div>
        <div className="card-title">
          <p>{product.name}</p>
        </div>
        <div className="card-content">
          <p>{product.shortDescription}</p>
        </div>
        <div className="card-action">
          <a href="#">Add to Cart</a>
        </div>
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.object
};

export default ProductCard;
