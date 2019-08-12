import React from "react";
import { shallow } from "enzyme";
import App from "../components/App";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import products from "../../../server/src/products.json";
import Alert from "../components/Alert";
import SearchInput from "../components/SearchInput";

test("App renders without crashing", () => {
  shallow(<App />);
});

/**
 * Navbar
 */
test("Navbar should match snapshot", () => {
  const navbar = shallow(<Navbar />);
  expect(navbar).toMatchSnapshot();
});

/**
 * ProductCard
 */
test("ProductCard renders with one produce", () => {
  const mock = products[0];
  const productCard = shallow(<ProductCard product={mock} />);
  expect(productCard.contains(mock.name)).toBeTruthy();
  expect(productCard.contains(mock.shortDescription)).toBeTruthy();
  expect(productCard).toMatchSnapshot();
});

/**
 * Alert
 */
test("Alert renders correctly", () => {
  const alert = shallow(<Alert />);
  expect(alert).toMatchSnapshot();
});

/**
 * SearchInput
 */
test("SearchInput renders correctly", () => {
  const searchInput = shallow(<SearchInput value="backpack" />);
  expect(searchInput.contains("backback"));
  expect(searchInput).toMatchSnapshot();
});
test("SearchInput updates correctly", () => {
  const handleKeyDown = jest.fn();
  const handleUpdate = jest.fn();
  const searchInput = shallow(
    <SearchInput handleKeyDown={handleKeyDown} handleUpdate={handleUpdate} />
  );
  searchInput.find("input").simulate("change");
  expect(handleUpdate).toBeCalled();
  searchInput.find("input").simulate("keyDown", { keyCode: 40 });
  expect(handleKeyDown).toBeCalled();
});
test("SearchInput submits on click", () => {
  const handleSubmit = jest.fn();
  const searchInput = shallow(<SearchInput handleSubmit={handleSubmit} />);
  searchInput.find("i").simulate("click");
  expect(handleSubmit).toBeCalled();
});

/**
 * App
 */
test("App renders correctly", () => {
  const mock = products;
  const app = shallow(<App />);
  app.instance().componentDidUpdate = jest.fn();

  /** message renders when user has not searched yet */
  app.instance().setState({ products: [], searchField: "", didSearch: false });
  expect(app.contains("Please enter a keyword to search")).toBeTruthy();

  /** Alert appears when user submits invalid search field */
  app.instance().setState({ products: [], searchField: "", didSearch: true });
  expect(app.find(Alert)).toHaveLength(1);

  /** Appropriate number of Product Cards render based on num products in state */
  app.instance().setState({ products: mock, searchField: "", didSearch: true });
  expect(app.find(ProductCard)).toHaveLength(8);
});
