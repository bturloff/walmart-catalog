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
 * Returns the elements of the products array that
 * contain the requestor's provided query keyword
 * @param {object} request
 * @return {Boolean}
 */
var searchProductsHandler = request => {
  return _products.default.filter(p => {
    var query = request.params.keyword;
    var descriptionToSearch = ("" + p.longDescription || "" + p.shortDescription || "").toLowerCase();
    return descriptionToSearch.includes(query);
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
        keyword: _joi.default.string().label("Search text").lowercase().error(err => err).min(1).error(err => err).max(20)
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