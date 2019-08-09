/** @module All routes for Search API */
import products from "./products.json";
import Joi from "@hapi/joi";

/**
 * Returns the elements of the products array that
 * contain the requestor's provided query keyword
 * @param {object} request
 * @return {Boolean}
 */
const searchProductsHandler = request => {
  return products.filter(p => {
    const query = request.params.keyword;

    const descriptionToSearch = (
      "" + p.longDescription ||
      "" + p.shortDescription ||
      ""
    ).toLowerCase();

    return descriptionToSearch.includes(query);
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
            .min(1)
            .max(20)
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
