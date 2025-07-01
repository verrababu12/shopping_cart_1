import React, { useContext } from "react";
import { Link } from "react-router-dom";
import CartContext from "../context/CartContext";
import "./Header.css"; // ✅ import CSS

const Header = () => {
  const { cartItems } = useContext(CartContext);
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="header">
      <h2 className="logo"> My Cart App</h2>
      <nav className="nav">
        <Link to="/products" className="nav-link">
          Products
        </Link>
        <Link to="/cart" className="nav-link">
          Cart ({totalQuantity})
        </Link>
      </nav>
    </header>
  );
};

export default Header;

// import React, { useContext } from "react";
// import { Link } from "react-router-dom";
// import CartContext from "../context/CartContext";

// const Header = () => {
//   const { cartItems } = useContext(CartContext);
//   const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

//   return (
//     <header style={styles.header}>
//       <h2>🛍️ My Cart App</h2>
//       <nav style={styles.nav}>
//         <Link to="/products">Products</Link>
//         <Link to="/cart">Cart ({totalQuantity})</Link>
//       </nav>
//     </header>
//   );
// };

// const styles = {
//   header: {
//     padding: "15px",
//     borderBottom: "1px solid #ccc",
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     flexWrap: "wrap",
//   },
//   nav: {
//     display: "flex",
//     gap: "20px",
//   },
// };

// export default Header;
