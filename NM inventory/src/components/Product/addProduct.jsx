import { useState } from "react";
import { useInventoryDispatch } from "../../context/InventoryContext";

export default function AddProduct() {
  const inventoryDispatch = useInventoryDispatch();
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [image, setImage] = useState("");

  const handleAddProduct = () => {
    if (!productName || !price || !stock) {
      alert("Please fill in all required fields.");
      return;
    }

    inventoryDispatch({
      type: "ADD_PRODUCT",
      product: {
        productName,
        price: parseFloat(price),
        stock: parseInt(stock),
        image: image || "", // optional image
      },
    });

    // Reset form
    setProductName("");
    setPrice("");
    setStock("");
    setImage("");

    alert("Product added successfully!");
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Add New Product</h2>

      <div className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Product Name"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          type="number"
          placeholder="Stock"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          type="text"
          placeholder="Image URL (optional)"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button
          onClick={handleAddProduct}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg transition-colors"
        >
          Add Product
        </button>
      </div>
    </div>
  );
}
