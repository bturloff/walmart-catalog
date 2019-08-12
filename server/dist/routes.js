"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _products = _interopRequireDefault(require("./products.json"));

var _joi = _interopRequireDefault(require("@hapi/joi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** @module All routes for Search API */

/**
 * Some product ids given in the problem statement
 * appear to be invalid. Only 8 were valid.
 */

/**
 * Returns the elements of the products array that
 * contain the requestor's provided query keyword.
 * @param {object} request
 * @return {Boolean}
 */
var searchProductsHandler = request => {
  var keyword = request.params.keyword;
  /** Return all products if keyword is empty */

  if (keyword.length === 0) return _products.default;
  /**
   * Filter products by any word in the keyword that is contained
   * in the product's short description, long description, or name
   */

  var queryStrings = request.params.keyword.split(/\s+/);
  return _products.default.filter(p => {
    var descriptionToSearch = ("" + (p.longDescription || "") + (p.shortDescription || "") + (p.name || "")).toLowerCase();
    return queryStrings.some(s => {
      return descriptionToSearch.includes(s);
    });
  });
};
/** Array of all routes for the Search API */


var routes = [{
  method: "GET",
  path: "/products/{keyword}",
  handler: searchProductsHandler,
  options: {
    validate: {
      params: {
        keyword: _joi.default.string().label("Search text").lowercase()
      },
      options: {
        abortEarly: false
      },
      failAction: (request, h, err) => {
        err.output.payload.details = err.details;
        return err;
      }
    },
    response: {
      schema: _joi.default.array(),
      failAction: "error"
    }
  }
}];
var _default = routes;
exports.default = _default;