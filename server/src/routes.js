import products from "./products.json";
import Joi from "@hapi/joi";

/**
 * Returns the elements of the products array that
 * contain the requestor's provided query keyword
 * @param {object} request
 * @return {Boolean}
 */
const getProductsHandler = request => {
  return products.filter(p => {
    const query = request.params.keyword.toLowerCase();

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
    handler: getProductsHandler,
    options: {
      validate: {
        params: {
          keyword: Joi.string()
            .min(1)
            .max(20)
        }
      }
    }
  }
];

export default routes;
