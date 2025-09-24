import React from "react";
import { useCartDispatch } from "../../context/CartContext";

export default function CartItem({ product }) {
  const cartDispatch = useCartDispatch();

  const handleIncrease = () => {
    cartDispatch({
      type: "INCREASE_QUANTITY",
      productName: product.productName,
    });
  };

  const handleDecrease = () => {
    cartDispatch({
      type: "DECREASE_QUANTITY",
      productName: product.productName,
    });
  };

  const handleRemove = () => {
    cartDispatch({
      type: "REMOVE_ITEM",
      productName: product.productName,
    });
  };

  return (
    <div className="flex items-center justify-between p-4 bg-white shadow rounded-lg gap-4">
      <div className="flex items-center gap-4">
        <img
          src={product.imageUrl || "https://via.placeholder.com/80"}
          alt={product.productName}
          className="w-20 h-20 object-cover rounded-lg"
        />
        <div>
          <h3 className="font-semibold text-lg">{product.productName}</h3>
          <p className="text-gray-600">₹{product.price.toFixed(2)}</p>
        </div>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center gap-2">
        <button
          onClick={handleDecrease}
          className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold"
        >
          -
        </button>
        <span className="px-3 font-medium">{product.quantity}</span>
        <button
          onClick={handleIncrease}
          className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold"
        >
          +
        </button>
      </div>

      {/* Remove Button */}
      <div className="flex items-center gap-2">
        <p className="font-semibold text-gray-700">
          ₹{(product.price * product.quantity).toFixed(2)}
        </p>
        <button
          onClick={handleRemove}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
        >
          Remove
        </button>
      </div>
    </div>
  );
}
