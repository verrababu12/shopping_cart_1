import { useState, useContext, useEffect } from "react";
import CartContext from "../context/CartContext";
import "./ProductList.css"; // ✅ Importing CSS

const defaultProducts = [
  { id: 1, name: "Apple", price: 30 },
  { id: 2, name: "Banana", price: 10 },
  { id: 3, name: "Orange", price: 20 },
  { id: 4, name: "DragonFruit", price: "40" },
];

const ProductList = () => {
  const { addToCart } = useContext(CartContext);

  const [products, setProducts] = useState(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("products"));
      return Array.isArray(stored) && stored.length > 0
        ? stored
        : defaultProducts;
    } catch {
      return defaultProducts;
    }
  });

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({ name: "", price: "" });

  const handleEditInput = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const deleteProduct = (id) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  const startEdit = (product) => {
    setEditId(product.id);
    setEditForm({ name: product.name, price: product.price });
  };

  const saveEdit = (id) => {
    setProducts(
      products.map((p) =>
        p.id === id
          ? { ...p, name: editForm.name, price: parseFloat(editForm.price) }
          : p
      )
    );
    setEditId(null);
  };

  const resetProducts = () => {
    setProducts(defaultProducts);
    localStorage.setItem("products", JSON.stringify(defaultProducts));
  };

  return (
    <div className="product-wrapper">
      <h2>Product List</h2>
      <button onClick={resetProducts} className="reset-button">
        Reset Products
      </button>

      {products.length === 0 ? (
        <p className="empty-text">No products found.</p>
      ) : (
        <div className="product-container">
          {products.map((p) => (
            <div key={p.id} className="product-card">
              {editId === p.id ? (
                <>
                  <input
                    type="text"
                    name="name"
                    value={editForm.name}
                    onChange={handleEditInput}
                    className="product-input"
                  />
                  <input
                    type="number"
                    name="price"
                    value={editForm.price}
                    onChange={handleEditInput}
                    className="product-input"
                  />
                  <button onClick={() => saveEdit(p.id)}>Save</button>
                  <button onClick={() => setEditId(null)}>Cancel</button>
                </>
              ) : (
                <>
                  <h3>{p.name}</h3>
                  <p>₹{p.price}</p>
                  <button onClick={() => addToCart(p)}>Add to Cart</button>
                  <button onClick={() => deleteProduct(p.id)}>Delete</button>
                  <button onClick={() => startEdit(p)}>Edit</button>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;

// import React, { useState, useContext, useEffect } from "react";
// import CartContext from "../context/CartContext";

// const defaultProducts = [
//   { id: 1, name: "Apple", price: 30 },
//   { id: 2, name: "Banana", price: 10 },
//   { id: 3, name: "Orange", price: 20 },
// ];

// const ProductList = () => {
//   const { addToCart } = useContext(CartContext);

//   // ✅ Load from localStorage or fallback to default products
//   const [products, setProducts] = useState(() => {
//     try {
//       const stored = JSON.parse(localStorage.getItem("products"));
//       return Array.isArray(stored) && stored.length > 0
//         ? stored
//         : defaultProducts;
//     } catch {
//       return defaultProducts;
//     }
//   });

//   // ✅ Save to localStorage on change
//   useEffect(() => {
//     localStorage.setItem("products", JSON.stringify(products));
//   }, [products]);

//   const [editId, setEditId] = useState(null);
//   const [editForm, setEditForm] = useState({ name: "", price: "" });

//   const handleEditInput = (e) => {
//     setEditForm({ ...editForm, [e.target.name]: e.target.value });
//   };

//   const deleteProduct = (id) => {
//     setProducts(products.filter((p) => p.id !== id));
//   };

//   const startEdit = (product) => {
//     setEditId(product.id);
//     setEditForm({ name: product.name, price: product.price });
//   };

//   const saveEdit = (id) => {
//     setProducts(
//       products.map((p) =>
//         p.id === id
//           ? { ...p, name: editForm.name, price: parseFloat(editForm.price) }
//           : p
//       )
//     );
//     setEditId(null);
//   };

//   const resetProducts = () => {
//     setProducts(defaultProducts);
//     localStorage.setItem("products", JSON.stringify(defaultProducts));
//   };

//   return (
//     <div style={styles.wrapper}>
//       <h2>Product List</h2>
//       <button onClick={resetProducts} style={styles.resetButton}>
//         🔄 Reset Products
//       </button>

//       {products.length === 0 ? (
//         <p>No products found.</p>
//       ) : (
//         <div style={styles.container}>
//           {products.map((p) => (
//             <div key={p.id} style={styles.card}>
//               {editId === p.id ? (
//                 <>
//                   <input
//                     type="text"
//                     name="name"
//                     value={editForm.name}
//                     onChange={handleEditInput}
//                   />
//                   <input
//                     type="number"
//                     name="price"
//                     value={editForm.price}
//                     onChange={handleEditInput}
//                   />
//                   <button onClick={() => saveEdit(p.id)}>Save</button>
//                   <button onClick={() => setEditId(null)}>Cancel</button>
//                 </>
//               ) : (
//                 <>
//                   <h3>{p.name}</h3>
//                   <p>₹{p.price}</p>
//                   <button onClick={() => addToCart(p)}>Add to Cart</button>
//                   <button onClick={() => deleteProduct(p.id)}>Delete</button>
//                   <button onClick={() => startEdit(p)}>Edit</button>
//                 </>
//               )}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// const styles = {
//   wrapper: {
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     gap: "20px",
//     padding: "20px",
//   },
//   resetButton: {
//     padding: "8px 16px",
//     marginBottom: "20px",
//     backgroundColor: "#e0e0e0",
//     border: "1px solid #ccc",
//     borderRadius: "6px",
//     cursor: "pointer",
//   },
//   container: {
//     display: "flex",
//     gap: "20px",
//     flexWrap: "wrap",
//     justifyContent: "center",
//   },
//   card: {
//     border: "1px solid #ccc",
//     padding: "15px",
//     borderRadius: "10px",
//     width: "170px",
//     textAlign: "center",
//     background: "#f9f9f9",
//   },
// };

// export default ProductList;

// import React, { useState, useContext, useEffect } from "react";
// import CartContext from "../context/CartContext";

// const ProductList = () => {
//   const { addToCart } = useContext(CartContext);

//   // ✅ Load from localStorage initially
//   const [products, setProducts] = useState(() => {
//     try {
//       const stored = JSON.parse(localStorage.getItem("products"));
//       return Array.isArray(stored) ? stored : [];
//     } catch {
//       return [];
//     }
//   });

//   // ✅ Sync to localStorage on change
//   useEffect(() => {
//     localStorage.setItem("products", JSON.stringify(products));
//   }, [products]);

//   const [form, setForm] = useState({ name: "", price: "" });
//   const [editId, setEditId] = useState(null);
//   const [editForm, setEditForm] = useState({ name: "", price: "" });

//   const handleInput = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleEditInput = (e) => {
//     setEditForm({ ...editForm, [e.target.name]: e.target.value });
//   };

//   const addProduct = () => {
//     if (!form.name || !form.price) return;
//     const newProduct = {
//       id: Date.now(),
//       name: form.name,
//       price: parseFloat(form.price),
//     };
//     setProducts([...products, newProduct]);
//     setForm({ name: "", price: "" });
//   };

//   const deleteProduct = (id) => {
//     setProducts(products.filter((p) => p.id !== id));
//   };

//   const startEdit = (product) => {
//     setEditId(product.id);
//     setEditForm({ name: product.name, price: product.price });
//   };

//   const saveEdit = (id) => {
//     setProducts(
//       products.map((p) =>
//         p.id === id
//           ? { ...p, name: editForm.name, price: parseFloat(editForm.price) }
//           : p
//       )
//     );
//     setEditId(null);
//   };

//   return (
//     <div style={styles.wrapper}>
//       <div style={styles.form}>
//         <input
//           type="text"
//           name="name"
//           placeholder="Product Name"
//           value={form.name}
//           onChange={handleInput}
//         />
//         <input
//           type="number"
//           name="price"
//           placeholder="Price"
//           value={form.price}
//           onChange={handleInput}
//         />
//         <button onClick={addProduct}>Add Product</button>
//       </div>

//       <div style={styles.container}>
//         {products.map((p) => (
//           <div key={p.id} style={styles.card}>
//             {editId === p.id ? (
//               <>
//                 <input
//                   type="text"
//                   name="name"
//                   value={editForm.name}
//                   onChange={handleEditInput}
//                 />
//                 <input
//                   type="number"
//                   name="price"
//                   value={editForm.price}
//                   onChange={handleEditInput}
//                 />
//                 <button onClick={() => saveEdit(p.id)}>Save</button>
//                 <button onClick={() => setEditId(null)}>Cancel</button>
//               </>
//             ) : (
//               <>
//                 <h3>{p.name}</h3>
//                 <p>₹{p.price}</p>
//                 <button onClick={() => addToCart(p)}>Add to Cart</button>
//                 <button onClick={() => deleteProduct(p.id)}>Delete</button>
//                 <button onClick={() => startEdit(p)}>Edit</button>
//               </>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// const styles = {
//   wrapper: {
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     gap: "20px",
//   },
//   form: {
//     display: "flex",
//     gap: "10px",
//     marginBottom: "20px",
//     flexWrap: "wrap",
//   },
//   container: {
//     display: "flex",
//     gap: "20px",
//     flexWrap: "wrap",
//     justifyContent: "center",
//   },
//   card: {
//     border: "1px solid #ccc",
//     padding: "15px",
//     borderRadius: "10px",
//     width: "170px",
//     textAlign: "center",
//   },
// };

// export default ProductList;
