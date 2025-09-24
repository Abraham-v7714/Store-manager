import React, { useState } from "react";
import { useInventoryDispatch, useInventory } from "../../context/InventoryContext";
import { useCart, useCartDispatch } from "../../context/CartContext";

const ProductItem = ({ product, alertValue }) => {
  const inventory = useInventory();
  const inventoryDispatch = useInventoryDispatch();
  const cart = useCart();
  const cartDispatch = useCartDispatch();

  const [quantity, setQuantity] = useState(1);

  const isDepleted = product.stock < alertValue;

  const addToCart = () => {
    const cartItem = cart.find(item => item.productName === product.productName);
    const currentQuantityInCart = cartItem ? cartItem.quantity : 0;

    if (currentQuantityInCart + quantity > product.stock) {
      alert(`Only ${product.stock - currentQuantityInCart} items left in stock`);
      return;
    }

    for (let i = 0; i < quantity; i++) {
      cartDispatch({ type: "ADD_TO_CART", product });
    }
    setQuantity(1);
  };

  return (
    <div className="bg-white rounded-xl shadow p-4 flex flex-col items-center text-center gap-3 transition-transform hover:scale-105">
      <img
        src={product.image || "https://via.placeholder.com/150"}
        alt={product.productName}
        className="w-32 h-32 sm:w-40 sm:h-40 object-cover rounded-lg"
      />
      <h2 className="text-lg sm:text-xl font-semibold text-gray-800">{product.productName}</h2>
      <p className="text-gray-600 font-medium text-base sm:text-lg">₹{product.price.toFixed(2)}</p>
      <p className={`font-medium ${isDepleted ? "text-red-500" : "text-green-600"}`}>
        Stock: {product.stock}
      </p>

      {isDepleted && <p className="text-red-500 font-semibold">Low Stock!</p>}

      <div className="flex items-center gap-2 mt-2">
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
          className="border border-gray-300 rounded-lg p-2 w-16 text-center"
          min="1"
          max={product.stock}
        />
        <button
          onClick={addToCart}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductItem;
