import React from "react";
import Cart from "../components/Cart";
import { GiShoppingCart } from "react-icons/gi";
import "./CartPage.css";

const CartPage = () => {
  return (
    <div className="cart-page">
      <h2 className="page-title">
        <GiShoppingCart /> Your Shopping Cart
      </h2>
      <Cart />
    </div>
  );
};

export default CartPage;
