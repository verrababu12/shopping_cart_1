import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import CartProvider from "./context/CartProvider";
import Header from "./components/Header";
import ProductsPage from "./pages/ProductsPage";
import CartPage from "./pages/CartPage";

import "./App.css";

const App = () => {
  return (
    <CartProvider>
      <BrowserRouter>
        <Header />
        <main className="bg-container">
          <Routes>
            <Route path="/" element={<Navigate to="/products" />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/cart" element={<CartPage />} />
          </Routes>
        </main>
      </BrowserRouter>
    </CartProvider>
  );
};

export default App;
