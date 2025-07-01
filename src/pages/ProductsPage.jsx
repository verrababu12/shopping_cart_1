import React from "react";
import ProductList from "../components/ProductList";
import { RiShoppingBagFill } from "react-icons/ri";
import "./ProductsPage.css"; // ✅ Optional: external styling

const ProductsPage = () => {
  return (
    <div className="products-page">
      <h2 className="page-title">
        <RiShoppingBagFill />  Products
      </h2>
      <ProductList />
    </div>
  );
};

export default ProductsPage;
