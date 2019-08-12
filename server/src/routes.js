/** @module All routes for Search API */

/**
 * Some product ids given in the problem statement
 * appear to be invalid. Only 8 were valid.
 */
import products from "./products.json";
import Joi from "@hapi/joi";

/**
 * Returns the elements of the products array that
 * contain the requestor's provided query keyword.
 * @param {object} request
 * @return {Boolean}
 */
const searchProductsHandler = request => {
  const keyword = request.params.keyword;

  /** Return all products if keyword is empty */
  if (keyword.length === 0) return products;

  /**
   * Filter products by any word in the keyword that is contained
   * in the product's short description, long description, or name
   */
  const queryStrings = request.params.keyword.split(/\s+/);
  return products.filter(p => {
    const descriptionToSearch = (
      "" +
      (p.longDescription || "") +
      (p.shortDescription || "") +
      (p.name || "")
    ).toLowerCase();

    return queryStrings.some(s => {
      return descriptionToSearch.includes(s);
    });
  });
};

/** Array of all routes for the Search API */
const routes = [
  {
    method: "GET",
    path: "/products/{keyword}",
    handler: searchProductsHandler,
    options: {
      validate: {
        params: {
          keyword: Joi.string()
            .label("Search text")
            .lowercase()
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
        schema: Joi.array(),
        failAction: "error"
      }
    }
  }
];

export default routes;
