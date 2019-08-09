"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _products = _interopRequireDefault(require("./products.json"));

var _joi = _interopRequireDefault(require("@hapi/joi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Returns the elements of the products array that
 * contain the requestor's provided query keyword
 * @param {object} request
 * @return {Boolean}
 */
var getProductsHandler = request => {
  return _products.default.filter(p => {
    var query = request.params.keyword.toLowerCase();
    var descriptionToSearch = ("" + p.longDescription || "" + p.shortDescription || "").toLowerCase();
    return descriptionToSearch.includes(query);
  });
};
/** Array of all routes for the Search API */


var routes = [{
  method: "GET",
  path: "/products/{keyword}",
  handler: getProductsHandler,
  options: {
    validate: {
      params: {
        keyword: _joi.default.string().min(1).max(20)
      }
    }
  }
}];
var _default = routes;
exports.default = _default;