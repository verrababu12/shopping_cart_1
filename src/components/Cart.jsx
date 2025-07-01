import React, { useContext } from "react";
import CartContext from "../context/CartContext";
import { MdDelete } from "react-icons/md";
import { GiShoppingCart } from "react-icons/gi";
import "./Cart.css"; // ✅ Importing the CSS file

const Cart = () => {
  const { cartItems, removeFromCart, increaseQty, decreaseQty, totalPrice } =
    useContext(CartContext);

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p className="empty-text">
          <GiShoppingCart /> Your cart is empty.
        </p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <span className="item-name">{item.name}</span>
              <div className="qty-controls">
                <button onClick={() => decreaseQty(item.id)}>-</button>
                <span className="qty">{item.quantity}</span>
                <button onClick={() => increaseQty(item.id)}>+</button>
              </div>
              <span className="item-price">₹{item.price * item.quantity}</span>
              <button
                className="remove-btn"
                onClick={() => removeFromCart(item.id)}
              >
                <MdDelete />
              </button>
            </div>
          ))}
          <h3 className="total">Total: ₹{totalPrice}</h3>
        </>
      )}
    </div>
  );
};

export default Cart;

// import React, { useContext } from "react";
// import CartContext from "../context/CartContext";

// const Cart = () => {
//   const { cartItems, removeFromCart, increaseQty, decreaseQty, totalPrice } =
//     useContext(CartContext);

//   return (
//     <div>
//       {cartItems.length === 0 ? (
//         <p>Cart is empty.</p>
//       ) : (
//         <>
//           {cartItems.map((item) => (
//             <div key={item.id} style={styles.item}>
//               <span>{item.name}</span>
//               <div>
//                 <button onClick={() => decreaseQty(item.id)}>-</button>
//                 <span style={styles.qty}>{item.quantity}</span>
//                 <button onClick={() => increaseQty(item.id)}>+</button>
//               </div>
//               <span>₹{item.price * item.quantity}</span>
//               <button onClick={() => removeFromCart(item.id)}>🗑️</button>
//             </div>
//           ))}
//           <h3>Total: ₹{totalPrice}</h3>
//         </>
//       )}
//     </div>
//   );
// };

// const styles = {
//   item: {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: "10px",
//     padding: "10px",
//     border: "1px solid #ddd",
//     borderRadius: "6px",
//   },
//   qty: {
//     margin: "0 10px",
//     minWidth: "30px",
//     textAlign: "center",
//   },
// };

// export default Cart;
