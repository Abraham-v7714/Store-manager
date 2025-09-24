import React, { useState } from "react";
import { useInventoryDispatch } from "../../context/InventoryContext";

const Product = ({ product, alertValue }) => {
  const inventoryDispatch = useInventoryDispatch();
  const [stockInput, setStockInput] = useState(0);

  const isDepleted = product.stock < alertValue;

  // Add stock function
  const addStock = () => {
    if (stockInput > 0) {
      inventoryDispatch({
        type: "STOCK_ADDED",
        productName: product.productName,
        stock: parseInt(stockInput),
      });
      setStockInput(0);
    }
  };

  // Remove product function
  const removeProduct = () => {
    inventoryDispatch({
      type: "REMOVE_PRODUCT",
      productName: product.productName,
    });
    alert(`${product.productName} removed from inventory`);
  };

  // Use cartImage.png only for Sample Item
  const productImage =
    product.productName === "Sample Item"
      ? "/cartImage.png"
      : product.image || "https://via.placeholder.com/150";

  return (
    <div className="bg-white rounded-xl shadow p-4 flex flex-col items-center text-center gap-3 transition-transform hover:scale-105">
      <img
        src={productImage}
        alt={product.productName}
        className="w-32 h-32 sm:w-40 sm:h-40 object-cover rounded-lg"
      />
      <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
        {product.productName}
      </h2>
      <p className="text-gray-600 font-medium text-base sm:text-lg">
        ₹{product.price.toFixed(2)}
      </p>
      <p
        className={`font-medium ${
          isDepleted ? "text-red-500" : "text-green-600"
        }`}
      >
        Stock: {product.stock}
      </p>

      {/* Input + Buttons */}
      <div className="flex flex-wrap justify-center sm:justify-start items-center gap-2 w-full mt-2">
        <input
          type="number"
          value={stockInput}
          onChange={(e) => setStockInput(e.target.value)}
          className="border border-gray-300 rounded-lg p-2 w-20 text-center"
          placeholder="0"
        />
        <button
          onClick={addStock}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg transition-colors"
        >
          Add Stock
        </button>
        <button
          onClick={removeProduct}
          className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-lg transition-colors"
        >
          Remove Product
        </button>
      </div>
    </div>
  );
};

export default Product;
