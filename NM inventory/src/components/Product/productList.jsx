import React from "react";
import { useCartDispatch } from "../../context/CartContext";

const ProductList = ({ products }) => {
  const cartDispatch = useCartDispatch();

  const handleAddToCart = (product) => {
    if (product.stock <= 0) {
      alert("This product is out of stock!");
      return;
    }

    cartDispatch({
      type: "ADD_TO_CART",
      product: product,
    });

    if (product.stock <= 5) {
      alert(`Warning: Only ${product.stock} left in stock!`);
    }
  };

  return (
    <>
      {products.map((product) => (
        <div
          key={product.productName}
          className="bg-white rounded-xl shadow p-4 flex flex-col items-center text-center gap-3 transition-transform hover:scale-105"
        >
          <img
            src={product.image || "https://via.placeholder.com/150"}
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
              product.stock <= 5 ? "text-red-500" : "text-green-600"
            }`}
          >
            Stock: {product.stock}
          </p>

          <button
            onClick={() => handleAddToCart(product)}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg transition-colors"
          >
            Add to Cart
          </button>
        </div>
      ))}
    </>
  );
};

export default ProductList;
